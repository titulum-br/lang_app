require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

// Configuration
const API_KEY = process.env.ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';
const OUTPUT_DIR = path.join(__dirname, '../assets/audio');

// Make sure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to list available voices
async function listVoices() {
  try {
    console.log('Fetching available voices...');
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
    console.log(`Found ${data.voices.length} voices`);
    
    // Log a few voices
    console.log('Available voices:');
    data.voices.slice(0, 5).forEach(voice => {
      console.log(`- ${voice.name}: ${voice.voice_id}`);
    });

    return data.voices;
  } catch (error) {
    console.error('Error fetching voices:', error.message);
    return [];
  }
}

// Function to generate speech directly with the API
async function generateSpeech(text, voiceId, outputPath) {
  try {
    console.log(`Generating speech for: "${text}" using voice ID: ${voiceId}`);
    
    const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate speech: ${response.status} ${response.statusText}\n${errorText}`);
    }

    console.log('Successfully generated speech, saving to file...');
    const buffer = await response.arrayBuffer();
    await writeFileAsync(outputPath, Buffer.from(buffer));
    console.log(`Speech saved to: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error generating speech:', error.message);
    return false;
  }
}

// Main function to run tests
async function runTests() {
  try {
    // 1. Get available voices
    const voices = await listVoices();
    if (voices.length === 0) {
      console.error('No voices found, cannot continue.');
      return;
    }

    // 2. Try generating speech with standard voices (Rachel, Bella, etc.)
    const testVoices = [
      { name: 'Rachel', id: '21m00Tcm4TlvDq8ikWAM', text: 'This is a test of the ElevenLabs API using Rachel voice.' },
      { name: 'Bella', id: 'EXAVITQu4vr4xnSDxMaL', text: 'This is a test of the ElevenLabs API using Bella voice.' },
      { name: 'Klaus', id: 'UQ3s9h7N3CVJBL2USizn', text: 'This is a test of the ElevenLabs API using Klaus voice.' },
      { name: 'First Available', id: voices[0].voice_id, text: `This is a test of the ElevenLabs API using ${voices[0].name} voice.` }
    ];

    // 3. Try each voice
    for (const voice of testVoices) {
      const outputPath = path.join(OUTPUT_DIR, `direct-test-${voice.name.toLowerCase()}.mp3`);
      const success = await generateSpeech(voice.text, voice.id, outputPath);
      if (success) {
        console.log(`Test for ${voice.name} voice succeeded!`);
      } else {
        console.log(`Test for ${voice.name} voice failed.`);
      }
    }
  } catch (error) {
    console.error('Error running tests:', error.message);
  }
}

// Run the tests
runTests().catch(console.error); 