/**
 * This script is designed to test various aspects of the audio handling 
 * within the Expo environment, intended to be run on a device or emulator 
 * where `expo-av` and `expo-file-system` are available.
 * 
 * It performs the following steps:
 * 1. Initializes Expo Audio mode.
 * 2. Verifies if specific test audio files (syllable and word for "cachorro") 
 *    exist in the `../assets/audio` directory.
 * 3. Attempts to copy these asset files to the app's document directory 
 *    (simulating how assets might be handled in a standalone build).
 * 4. Attempts to play the audio files from the document directory using Expo Audio.
 * 
 * Note: This uses Node.js `fs` for initial asset checks but relies on Expo modules
 * for filesystem operations and audio playback, so it needs an Expo runtime.
 */

/**
 * Test script for audio playback functionality
 * 
 * This script tests:
 * 1. Audio file existence
 * 2. Playing audio files using Expo's Audio module
 * 3. Testing the copying from assets to document directory
 */

require('dotenv').config();
const { Audio } = require('expo-av');
const FileSystem = require('expo-file-system');
const { Asset } = require('expo-asset');
const path = require('path');
const fs = require('fs');

// Test syllable and its file path
const TEST_SYLLABLE = {
  id: 'cachorro',
  syllable: 'ca',
  variant: 1
};

// Test word and its file path
const TEST_WORD = {
  id: 'cachorro',
  variant: 1
};

const getSyllableAudioPath = (id, syllable, variant = 1) => 
  `audio-syllable-pt_br-${id}-${syllable}-klaus-${variant}.mp3`;

const getWordAudioPath = (id, variant = 1) => 
  `audio-word-pt_br-${id}-klaus-${variant}.mp3`;

async function setupAudio() {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    console.log('Audio mode set successfully');
    return true;
  } catch (error) {
    console.error('Failed to set audio mode:', error);
    return false;
  }
}

async function verifyAudioFiles() {
  const syllableFile = getSyllableAudioPath(
    TEST_SYLLABLE.id, 
    TEST_SYLLABLE.syllable, 
    TEST_SYLLABLE.variant
  );
  
  const wordFile = getWordAudioPath(
    TEST_WORD.id,
    TEST_WORD.variant
  );
  
  console.log(`Checking for syllable audio file: ${syllableFile}`);
  console.log(`Checking for word audio file: ${wordFile}`);
  
  // Check if files exist in the assets directory
  const assetDir = path.resolve(__dirname, '../assets/audio');
  const syllableAssetPath = path.join(assetDir, syllableFile);
  const wordAssetPath = path.join(assetDir, wordFile);
  
  const syllableExists = fs.existsSync(syllableAssetPath);
  const wordExists = fs.existsSync(wordAssetPath);
  
  console.log(`Syllable file exists in assets: ${syllableExists}`);
  console.log(`Word file exists in assets: ${wordExists}`);
  
  return {
    syllableFile,
    wordFile,
    syllableExists,
    wordExists
  };
}

async function copyToDocumentDirectory(syllableFile, wordFile) {
  console.log('Setting up document directory...');
  
  // Create audio directory in document directory
  const audioDir = `${FileSystem.documentDirectory}audio/`;
  const audioDirInfo = await FileSystem.getInfoAsync(audioDir);
  
  if (!audioDirInfo.exists) {
    console.log('Creating audio directory...');
    await FileSystem.makeDirectoryAsync(audioDir, { intermediates: true });
  }
  
  // Copy syllable file
  const syllableDest = `${audioDir}${syllableFile}`;
  const syllableFileInfo = await FileSystem.getInfoAsync(syllableDest);
  
  if (!syllableFileInfo.exists) {
    try {
      // Try to access the asset directly in development
      const assetPath = path.resolve(__dirname, '../assets/audio', syllableFile);
      if (fs.existsSync(assetPath)) {
        await FileSystem.copyAsync({
          from: FileSystem.documentDirectory + '../assets/audio/' + syllableFile,
          to: syllableDest
        });
        console.log(`Copied syllable file to ${syllableDest}`);
      } else {
        console.error(`Syllable file not found at: ${assetPath}`);
      }
    } catch (error) {
      console.error('Error copying syllable file:', error);
    }
  } else {
    console.log(`Syllable file already exists at ${syllableDest}`);
  }
  
  // Copy word file
  const wordDest = `${audioDir}${wordFile}`;
  const wordFileInfo = await FileSystem.getInfoAsync(wordDest);
  
  if (!wordFileInfo.exists) {
    try {
      // Try to access the asset directly in development
      const assetPath = path.resolve(__dirname, '../assets/audio', wordFile);
      if (fs.existsSync(assetPath)) {
        await FileSystem.copyAsync({
          from: FileSystem.documentDirectory + '../assets/audio/' + wordFile,
          to: wordDest
        });
        console.log(`Copied word file to ${wordDest}`);
      } else {
        console.error(`Word file not found at: ${assetPath}`);
      }
    } catch (error) {
      console.error('Error copying word file:', error);
    }
  } else {
    console.log(`Word file already exists at ${wordDest}`);
  }
  
  return {
    syllablePath: syllableDest,
    wordPath: wordDest
  };
}

async function playAudio(audioPath) {
  try {
    console.log(`Attempting to play audio: ${audioPath}`);
    
    // Create and play the sound
    const { sound } = await Audio.Sound.createAsync({ uri: audioPath });
    
    // Configure sound to update state when finished
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        console.log('Sound finished playing');
        sound.unloadAsync();
      }
    });
    
    // Play the sound
    await sound.playAsync();
    console.log('Audio playing');
    
    // Wait for sound to finish (simple implementation)
    return new Promise((resolve) => {
      setTimeout(() => {
        sound.unloadAsync();
        resolve(true);
      }, 3000); // Assume audio is less than 3 seconds
    });
  } catch (error) {
    console.error('Error playing audio:', error);
    return false;
  }
}

async function runTests() {
  console.log('Starting audio playback tests...');
  
  // Step 1: Set up audio
  const audioSetup = await setupAudio();
  if (!audioSetup) {
    console.error('Audio setup failed. Tests cannot continue.');
    return;
  }
  
  // Step 2: Verify audio files
  const { syllableFile, wordFile, syllableExists, wordExists } = await verifyAudioFiles();
  
  if (!syllableExists && !wordExists) {
    console.error('No test audio files found. Please generate audio files first.');
    return;
  }
  
  // Step 3: Copy to document directory
  const { syllablePath, wordPath } = await copyToDocumentDirectory(syllableFile, wordFile);
  
  // Step 4: Play syllable audio
  if (syllableExists) {
    console.log('Testing syllable audio playback...');
    const syllableSuccess = await playAudio(syllablePath);
    console.log(`Syllable audio playback success: ${syllableSuccess}`);
  }
  
  // Step 5: Play word audio
  if (wordExists) {
    console.log('Testing word audio playback...');
    const wordSuccess = await playAudio(wordPath);
    console.log(`Word audio playback success: ${wordSuccess}`);
  }
  
  console.log('Audio playback tests completed!');
}

// Run the tests
runTests().catch(error => {
  console.error('Test execution failed:', error);
}); 