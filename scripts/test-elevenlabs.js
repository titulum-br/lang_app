require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ElevenLabsClient } = require('elevenlabs');

// Check both environment variable formats
const API_KEY = process.env.ELEVENLABS_API_KEY || process.env.ELEVEN_LABS_API_KEY;

if (!API_KEY) {
  console.error('No API key found. Make sure ELEVENLABS_API_KEY or ELEVEN_LABS_API_KEY is set in your .env file');
  process.exit(1);
}

console.log('Starting ElevenLabs test with API key:', API_KEY);
console.log('API key length:', API_KEY.length);
console.log('Environment variables found:');
if (process.env.ELEVENLABS_API_KEY) console.log('- ELEVENLABS_API_KEY is set');
if (process.env.ELEVEN_LABS_API_KEY) console.log('- ELEVEN_LABS_API_KEY is set');
if (process.env.ELEVENLABS_VOICE_ID) console.log('- ELEVENLABS_VOICE_ID is set:', process.env.ELEVENLABS_VOICE_ID);
if (process.env.ELEVEN_LABS_VOICE_ID) console.log('- ELEVEN_LABS_VOICE_ID is set:', process.env.ELEVEN_LABS_VOICE_ID);

const voice = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice ID (default voice)
const elevenlabs = new ElevenLabsClient({
  apiKey: API_KEY,
});

async function testVoiceGeneration() {
  try {
    console.log('Getting available voices...');
    const voices = await elevenlabs.voices.getAll();
    console.log(`Found ${voices.voices.length} voices`);
    
    // List available voices with voice IDs
    console.log('\nAvailable voices:');
    voices.voices.forEach(v => {
      console.log(`- ${v.name}: ${v.voice_id}`);
    });
    
    // Success - we've confirmed the API key works
    console.log('\nAPI key is valid!');
    
    // Let's try to generate audio with a free voice - Rachel is usually available on free tier
    const rachelVoiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice ID
    console.log(`\nAttempting to generate a test audio file with Rachel voice (${rachelVoiceId})...`);
    
    const text = "This is a test of the ElevenLabs API";
    const audioResponse = await elevenlabs.generate({
      text,
      voice_id: rachelVoiceId,
      model_id: 'eleven_multilingual_v2',
      output_format: "mp3"
    });
    
    if (audioResponse) {
      const outputPath = path.join(__dirname, '../assets/audio/test-rachel.mp3');
      
      // Ensure the directory exists
      const audioDir = path.dirname(outputPath);
      if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
        console.log(`Created directory: ${audioDir}`);
      }
      
      // Write the file
      console.log('Received audio data, saving to file...');
      fs.writeFileSync(outputPath, audioResponse);
      console.log(`Successfully saved audio to: ${outputPath}`);
      
      // If Rachel works, try another popular free voice - Bella
      const bellaVoiceId = "EXAVITQu4vr4xnSDxMaL";
      console.log(`\nAttempting to generate a test audio file with Bella voice (${bellaVoiceId})...`);
      
      const bellaResponse = await elevenlabs.generate({
        text: "This is another test with Bella's voice",
        voice_id: bellaVoiceId,
        model_id: 'eleven_multilingual_v2',
        output_format: "mp3"
      });
      
      if (bellaResponse) {
        const bellaPath = path.join(__dirname, '../assets/audio/test-bella.mp3');
        fs.writeFileSync(bellaPath, bellaResponse);
        console.log(`Successfully saved Bella's audio to: ${bellaPath}`);
      }
    }
  } catch (error) {
    console.error('Error in test:');
    console.error(error);
    
    // Check if the error has a response property with more details
    if (error.response) {
      console.error('Response details:');
      try {
        console.error(`Status: ${error.response.status}`);
        console.error(`Data: ${JSON.stringify(error.response.data)}`);
      } catch (e) {
        console.error('Could not stringify response data:', e);
        console.error('Raw response:', error.response);
      }
    }
  }
}

testVoiceGeneration(); 