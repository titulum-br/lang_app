/**
 * flashcardProcessor.js
 * 
 * Utility to process simplified flashcard data and match with available assets.
 */

import { audioMap, syllableAudio, wordAudio } from '../../assets/audioImports';
import { imageMap, groupedImages } from '../../assets/imageImports';

// Default language
let currentLanguage = 'pt_br';

/**
 * Set the current language for the app
 * @param {string} language - Language code (e.g., 'pt_br')
 */
export const setLanguage = (language) => {
  currentLanguage = language;
};

/**
 * Get current language
 * @returns {string} Current language code
 */
export const getLanguage = () => {
  return currentLanguage;
};

/**
 * Find all matching syllable audio files for a base name
 * @param {string} baseName - Base name like "audio-syllable-language-cachorro-ca"
 * @returns {Array} Array of matching audio files
 */
export const findSyllableAudio = (baseName) => {
  // Replace language placeholder with actual language
  const pattern = baseName.replace('language', currentLanguage);
  
  // Find all matching audio files
  const matches = Object.keys(syllableAudio).filter(filename => 
    filename.startsWith(pattern)
  );
  
  return matches;
};

/**
 * Find all matching word audio files for a base name
 * @param {string} baseName - Base name like "audio-word-language-cachorro"
 * @returns {Array} Array of matching audio files
 */
export const findWordAudio = (baseName) => {
  // Replace language placeholder with actual language
  const pattern = baseName.replace('language', currentLanguage);
  
  // Find all matching audio files
  const matches = Object.keys(wordAudio).filter(filename => 
    filename.startsWith(pattern)
  );
  
  return matches;
};

/**
 * Find all matching image files for a base pattern
 * @param {string} basePattern - Base pattern like "objeto-animal-cachorro"
 * @returns {Array} Array of matching image files
 */
export const findImages = (basePattern) => {
  if (groupedImages[basePattern]) {
    return groupedImages[basePattern];
  }
  return [];
};

/**
 * Process simplified flashcard data and expand with available assets
 * @param {Object} flashcards - Simplified flashcard data
 * @returns {Object} Expanded flashcard data with matched assets
 */
export const processFlashcards = (flashcards) => {
  const processed = {};
  
  // Process each category
  Object.keys(flashcards).forEach(category => {
    processed[category] = {};
    
    // Process each item in the category
    Object.keys(flashcards[category]).forEach(itemKey => {
      const item = flashcards[category][itemKey];
      
      // Find matching assets
      const syllableAudioFiles = findSyllableAudio(item.audioSyllable);
      const wordAudioFiles = findWordAudio(item.audioWord);
      const imageFiles = findImages(item.images);
      
      // Create expanded item
      processed[category][itemKey] = {
        name: item.name,
        tip: item.tip,
        audioSyllable: syllableAudioFiles,
        audioWord: wordAudioFiles,
        images: imageFiles
      };
    });
  });
  
  return processed;
};

/**
 * Get a random audio file from an array of matching files
 * @param {Array} audioFiles - Array of audio file names
 * @returns {Object} Audio object that can be played
 */
export const getRandomAudio = (audioFiles) => {
  if (!audioFiles || audioFiles.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  const filename = audioFiles[randomIndex];
  
  return audioMap[filename];
};

/**
 * Get a random image from an array of matching files
 * @param {Array} imageFiles - Array of image file names
 * @returns {Object} Image object that can be displayed
 */
export const getRandomImage = (imageFiles) => {
  if (!imageFiles || imageFiles.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  const filename = imageFiles[randomIndex];
  
  return imageMap[filename];
};

export default {
  setLanguage,
  getLanguage,
  findSyllableAudio,
  findWordAudio,
  findImages,
  processFlashcards,
  getRandomAudio,
  getRandomImage
}; 