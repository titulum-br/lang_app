const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

// Get API key from environment variables
const API_KEY = process.env.ELEVENLABS_API_KEY || process.env.ELEVEN_LABS_API_KEY;
if (!API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY is not defined in .env file');
  process.exit(1);
}

// Configuration
const BASE_URL = 'https://api.elevenlabs.io/v1';
const NUM_SAMPLES = 3; // Number of variations to generate for each audio
const OUTPUT_DIR = path.join(__dirname, '../assets/audio');
const FLASHCARDS_PATH = path.join(__dirname, '../assets/images/flashcards.json');
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || process.env.ELEVEN_LABS_VOICE_ID || 'UQ3s9h7N3CVJBL2USizn'; // Klaus voice ID
const MODEL_ID = 'eleven_multilingual_v2';
const OUTPUT_FORMAT = 'mp3_44100_128';

// Read command line arguments
const args = process.argv.slice(2);
const TEST_MODE = args.includes('--test');
const LIMIT_ARG = args.find(arg => arg.startsWith('--limit='));
const FILE_LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split('=')[1], 10) : (TEST_MODE ? 10 : 0);

// Make sure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to verify API key and voice ID
async function verifyCredentials() {
  try {
    console.log('Verifying API key...');
    
    // Try to get the list of voices to verify the API key
    const response = await fetch(`${BASE_URL}/voices`, {
      method: 'GET',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get voices: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`API key is valid. Found ${data.voices.length} voices.`);
    
    // Check if the voice ID exists
    const voice = data.voices.find(v => v.voice_id === VOICE_ID);
    if (voice) {
      console.log(`Voice ID '${VOICE_ID}' is valid (${voice.name}).`);
    } else {
      console.error(`Voice ID '${VOICE_ID}' was not found in your available voices.`);
      console.log('Available voices:');
      data.voices.forEach(voice => {
        console.log(`- ${voice.name}: ${voice.voice_id}`);
      });
      return false;
    }
    
    // Check user subscription
    try {
      console.log('Checking user subscription status...');
      const userResponse = await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      
      if (!userResponse.ok) {
        throw new Error(`Failed to get user info: ${userResponse.status} ${userResponse.statusText}`);
      }
      
      const userInfo = await userResponse.json();
      console.log('User subscription details:');
      console.log(`- Tier: ${userInfo.subscription.tier}`);
      console.log(`- Status: ${userInfo.subscription.status}`);
      console.log(`- Character limit: ${userInfo.subscription.character_limit}`);
      console.log(`- Characters used: ${userInfo.subscription.character_count}`);
      console.log(`- Characters remaining: ${userInfo.subscription.character_limit - userInfo.subscription.character_count}`);
      
      // Check if we have enough characters left
      if (userInfo.subscription.character_count >= userInfo.subscription.character_limit) {
        console.error('You have reached your character limit for this billing period.');
        return false;
      }
    } catch (subError) {
      console.error('Could not retrieve subscription info:', subError.message);
      // Continue anyway as this might not be critical
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying API credentials:', error.message);
    return false;
  }
}

// Function to extract all syllables and words from flashcards.json
function extractTipsFromFlashcards() {
  const flashcardsData = JSON.parse(fs.readFileSync(FLASHCARDS_PATH, 'utf8'));
  const syllables = new Set();
  const words = new Set();
  
  // Loop through all categories and items
  Object.values(flashcardsData).forEach(category => {
    Object.entries(category).forEach(([key, item]) => {
      if (item.tip) {
        syllables.add({ word: key, syllable: item.tip.toLowerCase() });
      }
      if (item.name) {
        words.add({ key, word: item.name });
      }
    });
  });
  
  return {
    syllables: Array.from(syllables),
    words: Array.from(words)
  };
}

// Function to generate audio using direct API calls
async function generateAudio(text, outputPath, stability = 0.5, similarity_boost = 0.5, retryCount = 0) {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 5000; // 5 seconds
  
  try {
    console.log(`Generating audio for: "${text}"${retryCount > 0 ? ` (Retry ${retryCount}/${MAX_RETRIES})` : ''}`);
    
    const response = await fetch(`${BASE_URL}/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability,
          similarity_boost,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      // Special handling for rate limit errors with automatic retry
      if (response.status === 429 && retryCount < MAX_RETRIES) {
        console.error(`Rate limit exceeded for "${text}". Retry ${retryCount + 1}/${MAX_RETRIES} after ${RETRY_DELAY/1000} seconds...`);
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        // Retry the call with incremented retry count
        return generateAudio(text, outputPath, stability, similarity_boost, retryCount + 1);
      }
      
      throw new Error(`Failed to generate audio: ${response.status} ${response.statusText}\n${errorText}`);
    }
    
    // Get the audio data and save it
    const audioBuffer = await response.arrayBuffer();
    await writeFileAsync(outputPath, Buffer.from(audioBuffer));
    
    console.log(`Successfully generated: ${outputPath}`);
    
    // Add a longer delay to avoid rate limiting (500ms instead of 200ms)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error(`Error generating audio for "${text}":`, error.message);
    
    // Try to check for specific error types
    if (error.message.includes('403')) {
      console.error('This appears to be a permissions issue. Possible reasons:');
      console.error('1. Character limit reached for your subscription');
      console.error('2. Free trial expired');
      console.error('3. Voice may require premium subscription');
      console.error('Please check your ElevenLabs account at https://elevenlabs.io/account');
    } else if (error.message.includes('429')) {
      console.error('Rate limit error. Consider:');
      console.error('1. Reducing batch size');
      console.error('2. Increasing delay between requests');
      console.error('3. Upgrading your ElevenLabs subscription for higher rate limits');
      
      // If we haven't reached max retries, try again after a delay
      if (retryCount < MAX_RETRIES) {
        console.log(`Will retry automatically in ${RETRY_DELAY/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return generateAudio(text, outputPath, stability, similarity_boost, retryCount + 1);
      }
    }
    
    return false;
  }
}

// Main function to generate all audio files
async function generateAllAudioFiles() {
  // First verify the API key and voice ID
  const credentialsValid = await verifyCredentials();
  if (!credentialsValid) {
    console.error('Unable to proceed due to invalid credentials.');
    return;
  }
  
  console.log('Extracting tips from flashcards.json...');
  const { syllables, words } = extractTipsFromFlashcards();
  
  console.log(`Found ${syllables.length} syllables and ${words.length} words to generate`);
  console.log('Starting audio generation...');
  
  // Create a list of all tasks to complete
  const tasks = [];
  
  // Add syllable generation tasks
  for (const { word, syllable } of syllables) {
    for (let i = 1; i <= NUM_SAMPLES; i++) {
      const outputPath = path.join(
        OUTPUT_DIR,
        `audio-syllable-pt_br-${word}-${syllable}-klaus-${i}.mp3`
      );
      tasks.push({ text: syllable, outputPath, type: 'syllable' });
    }
  }
  
  // Add word generation tasks
  for (const { key, word } of words) {
    for (let i = 1; i <= NUM_SAMPLES; i++) {
      const outputPath = path.join(
        OUTPUT_DIR,
        `audio-word-pt_br-${key}-klaus-${i}.mp3`
      );
      tasks.push({ text: word, outputPath, type: 'word' });
    }
  }
  
  console.log(`Total tasks: ${tasks.length} audio files`);
  
  // Apply file limit if specified
  const processedTasks = FILE_LIMIT > 0 ? tasks.slice(0, FILE_LIMIT) : tasks;
  
  if (FILE_LIMIT > 0) {
    console.log(`LIMIT MODE: Will only generate ${processedTasks.length} audio files`);
  }
  
  // Uncomment the following if you want to run in test mode with only 10 files
  // const processedTasks = tasks.slice(0, 10);
  // console.log(`TESTING MODE: Will only generate 10 audio files`);
  
  // Or use all tasks for full generation
  // const processedTasks = tasks;
  
  // Process tasks with some parallelism (but not too much to avoid rate limits)
  const BATCH_SIZE = 2; // Reduced batch size to avoid rate limits
  for (let i = 0; i < processedTasks.length; i += BATCH_SIZE) {
    const batch = processedTasks.slice(i, i + BATCH_SIZE);
    
    console.log(`Processing batch ${Math.ceil((i + 1) / BATCH_SIZE)} of ${Math.ceil(processedTasks.length / BATCH_SIZE)}`);
    
    // Process batch in parallel
    const results = await Promise.all(
      batch.map(task => 
        generateAudio(
          task.text, 
          task.outputPath, 
          task.type === 'syllable' ? 0.6 : 0.4,  // Different stability for syllables vs words
          task.type === 'syllable' ? 0.7 : 0.5   // Different similarity boost for syllables vs words
        )
      )
    );
    
    // Count successful generations in this batch
    const successCount = results.filter(r => r).length;
    console.log(`Completed batch ${Math.ceil((i + 1) / BATCH_SIZE)}: ${successCount}/${batch.length} succeeded`);
    
    // Add a longer delay between batches to respect rate limits
    const delayTime = 2000; // 2 seconds between batches
    console.log(`Waiting ${delayTime/1000} seconds before next batch to avoid rate limits...`);
    await new Promise(resolve => setTimeout(resolve, delayTime));
  }
  
  console.log('Audio generation completed!');
}

// Execute the main function
generateAllAudioFiles().catch(error => {
  console.error('Error in audio generation process:', error);
  process.exit(1);
}); 