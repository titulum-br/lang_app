/**
 * audioUtils.js
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * All rights reserved.
 */

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Platform, Alert } from 'react-native';
import { audioMap } from '../../assets/audioImports';

// Get a random number between 1-3 for audio sample variation
export const getRandomSampleNumber = () => Math.floor(Math.random() * 3) + 1;

// Function to get the audio file path for a syllable or word
export const getAudioPath = (flashcard, isSyllable) => {
  const sampleNumber = getRandomSampleNumber();
  const voiceName = 'klaus'; // This could be configurable
  
  if (isSyllable) {
    // For syllable audio (first tip)
    const key = `audio-syllable-pt_br-${flashcard.item}-${flashcard.tip.toLowerCase()}-${voiceName}-${sampleNumber}.mp3`;
    return audioMap[key] || null;
  } else {
    // For word audio (full name)
    const key = `audio-word-pt_br-${flashcard.item}-${voiceName}-${sampleNumber}.mp3`;
    return audioMap[key] || null;
  }
};

// Function to play audio with multiple fallback options
export const playAudio = async (audioSource, setSound, setIsPlayingAudio) => {
  try {
    console.log(`Attempting to play audio from source:`, audioSource);
    setIsPlayingAudio(true);
    
    let soundObject;
    
    // Check if audioSource is a URI string or a require'd asset module
    if (typeof audioSource === 'string') {
      // It's a URI string (likely a file path)
      console.log(`Loading sound from URI: ${audioSource}`);
      
      // Check if file exists (if it's a file URI)
      if (audioSource.startsWith(FileSystem.documentDirectory)) {
        const fileInfo = await FileSystem.getInfoAsync(audioSource);
        
        if (!fileInfo.exists) {
          console.log(`Audio file not found at: ${audioSource}`);
          throw new Error('Audio file not found');
        }
      }
      
      // Create sound object from URI
      const { sound } = await Audio.Sound.createAsync({ uri: audioSource });
      soundObject = sound;
      
    } else {
      // It's a require'd asset module
      console.log(`Loading sound from bundled asset`);
      const { sound } = await Audio.Sound.createAsync(audioSource);
      soundObject = sound;
    }
    
    // Update state with the sound object
    if (setSound) setSound(soundObject);
    
    // Configure sound to update state when finished
    soundObject.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        console.log('Sound finished playing');
        soundObject.unloadAsync();
        if (setSound) setSound(null);
        if (setIsPlayingAudio) setIsPlayingAudio(false);
      }
    });
    
    // Play the sound
    await soundObject.playAsync();
    console.log('Audio playing successfully');
    return true;
    
  } catch (error) {
    console.error('Error playing audio:', error);
    
    // Try fallback to test audio
    try {
      console.log('Falling back to test audio');
      const { sound: fallbackSound } = await Audio.Sound.createAsync(audioMap['direct-test-klaus.mp3']);
      
      if (setSound) setSound(fallbackSound);
      
      // Configure cleanup
      fallbackSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          fallbackSound.unloadAsync();
          if (setSound) setSound(null);
          if (setIsPlayingAudio) setIsPlayingAudio(false);
        }
      });
      
      await fallbackSound.playAsync();
      console.log('Fallback audio playing');
      return true;
      
    } catch (fallbackError) {
      console.error('Failed even with fallback test audio:', fallbackError);
      if (setIsPlayingAudio) setIsPlayingAudio(false);
      Alert.alert('Audio Error', 'Could not play audio file.');
      return false;
    }
  }
};

// Helper function to ensure audio directory exists
export const ensureAudioDirectoryExists = async () => {
  try {
    const audioDir = `${FileSystem.documentDirectory}audio/`;
    const audioDirInfo = await FileSystem.getInfoAsync(audioDir);
    
    if (!audioDirInfo.exists) {
      console.log('Creating audio directory...');
      await FileSystem.makeDirectoryAsync(audioDir, { intermediates: true });
    }
    
    return audioDir;
  } catch (error) {
    console.error('Error ensuring audio directory exists:', error);
    throw error;
  }
};

// Create a test audio file to ensure we always have something to play
export const createTestAudioFile = async () => {
  console.log("AUDIO_UTILS: createTestAudioFile - START");
  try {
    const audioDir = await ensureAudioDirectoryExists();
    const testAudioPath = `${audioDir}test-audio.mp3`;
    const fileInfo = await FileSystem.getInfoAsync(testAudioPath);
    
    if (!fileInfo.exists) {
      console.log('Creating test audio file...');
      
      // Minimal empty MP3 file as base64
      const emptyAudioContent = 'SUQzBAAAAAABBlRJVDIAAAAZAAAAaHR0cDovL3d3dy5mcmVlc2Z4LmNvLnVrVFBFMQAAABgAAABodHRwOi8vd3d3LmZyZWVzZnguY28udWtUQUxCAAAAGAAAAGh0dHA6Ly93d3cuZnJlZXNmeC5jby51a1RZRVIAAAAYAAAAaHR0cDovL3d3dy5mcmVlc2Z4LmNvLnVrVENPTgAAABsAAABTb3VuZCBFZmZlY3QgLSBGcmVlU0ZYLmNvLnVrQ09NTQAAACkAAABlbmcAU291bmQgRWZmZWN0IC0gRnJlZVNGWC5jby51ayBFZmZlY3RzVENPUAAAABgAAABodHRwOi8vd3d3LmZyZWVzZnguY28udWsAAAAAAAAAAAAAAAAAAAA=';
      
      await FileSystem.writeAsStringAsync(
        testAudioPath,
        emptyAudioContent,
        { encoding: FileSystem.EncodingType.Base64 }
      );
      
      console.log('Test audio file created at:', testAudioPath);
      console.log("AUDIO_UTILS: createTestAudioFile - END (Success)");
      return testAudioPath;
    } else {
      console.log('Test audio file already exists at:', testAudioPath);
      console.log("AUDIO_UTILS: createTestAudioFile - END (Success)");
      return testAudioPath;
    }
  } catch (error) {
    console.error('Error creating test audio file:', error);
    console.log("AUDIO_UTILS: createTestAudioFile - END (Error)");
    throw error;
  }
};

// Helper function to copy an asset to the file system
export const copyAssetToFS = async (assetModule, destUri) => {
  try {
    // Load the asset
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();
    
    // Get the file info at the destination
    const fileInfo = await FileSystem.getInfoAsync(destUri);
    
    // Only copy if the file doesn't exist at the destination
    if (!fileInfo.exists) {
      console.log(`Copying asset to: ${destUri}`);
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: destUri
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error copying asset to file system:', error);
    return false;
  }
};

// Initialize the Audio module
export const initAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    
    // Ensure a test audio file exists
    console.log("AUDIO_UTILS: initAudio - Calling createTestAudioFile...");
    await createTestAudioFile();
    console.log("AUDIO_UTILS: initAudio - createTestAudioFile finished.");
    
    console.log('Audio initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize audio:', error);
    return false;
  }
}; 