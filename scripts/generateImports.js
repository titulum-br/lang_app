/**
 * This script automatically generates JavaScript files (`audioImports.js` and `imageImports.js`)
 * within the `../assets/` directory.
 * 
 * It scans the `../assets/audio` and `../assets/images` directories for .mp3 and image files, respectively.
 * It then creates modules that export maps (`audioMap`, `imageMap`) where keys are filenames
 * and values are the result of `require('./path/to/asset')`.
 * 
 * This approach is necessary for React Native's Metro bundler, which requires asset paths
 * to be known statically at build time (dynamic `require` calls with variable paths don't work).
 * By pre-generating these import maps, the application can reference assets dynamically by filename
 * while still satisfying Metro's static analysis requirements.
 * 
 * Run this script whenever assets in the audio or images directories are added, removed, or renamed.
 */

const fs = require('fs');
const path = require('path');

// Paths
const AUDIO_DIR = path.join(__dirname, '../assets/audio');
const IMAGES_DIR = path.join(__dirname, '../assets/images');
const AUDIO_IMPORTS_FILE = path.join(__dirname, '../assets/audioImports.js');
const IMAGE_IMPORTS_FILE = path.join(__dirname, '../assets/imageImports.js');

// Generate Audio Imports
function generateAudioImports() {
  console.log('Scanning audio files...');
  const audioFiles = fs.readdirSync(AUDIO_DIR).filter(file => file.endsWith('.mp3'));
  
  // Group audio files
  const testAudio = audioFiles.filter(file => file.includes('test'));
  const syllableAudio = audioFiles.filter(file => file.includes('syllable'));
  const wordAudio = audioFiles.filter(file => file.includes('word'));

  // Create import content
  let content = `/**
 * audioImports.js
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * All rights reserved.
 * 
 * THIS FILE IS AUTO-GENERATED - DO NOT MODIFY DIRECTLY
 */

// Create an audio map with all available audio files
// This allows us to statically import audio files at build time
// instead of using dynamic requires which don't work in React Native

// Test audio (always included)
const testAudio = {
${testAudio.map(file => `  '${file}': require('./audio/${file}')`).join(',\n')}
};

// Syllable audio files
const syllableAudio = {
${syllableAudio.map(file => `  '${file}': require('./audio/${file}')`).join(',\n')}
};

// Word audio files
const wordAudio = {
${wordAudio.map(file => `  '${file}': require('./audio/${file}')`).join(',\n')}
};

// Combine all audio maps
const audioMap = {
  ...testAudio,
  ...syllableAudio,
  ...wordAudio
};

export { audioMap, testAudio, syllableAudio, wordAudio }; 
`;

  // Write to file
  fs.writeFileSync(AUDIO_IMPORTS_FILE, content);
  console.log(`Generated ${AUDIO_IMPORTS_FILE} with ${audioFiles.length} audio files`);
}

// Generate Image Imports
function generateImageImports() {
  console.log('Scanning image files...');
  const imageFiles = fs.readdirSync(IMAGES_DIR).filter(file => 
    file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
  );
  
  // Group image files by prefix
  const groupedImages = {};
  
  imageFiles.forEach(file => {
    // Extract prefix like "objeto-animal-cachorro"
    const parts = file.split('-');
    if (parts.length >= 3) {
      const prefix = parts.slice(0, 3).join('-');
      if (!groupedImages[prefix]) {
        groupedImages[prefix] = [];
      }
      groupedImages[prefix].push(file);
    } else {
      // Handle files without expected format
      const prefix = 'other';
      if (!groupedImages[prefix]) {
        groupedImages[prefix] = [];
      }
      groupedImages[prefix].push(file);
    }
  });

  // Create import content
  let content = `/**
 * imageImports.js
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * All rights reserved.
 * 
 * THIS FILE IS AUTO-GENERATED - DO NOT MODIFY DIRECTLY
 */

// Create an image map with all available image files
// This allows us to statically import image files at build time

const imageMap = {
${imageFiles.map(file => `  '${file}': require('./images/${file}')`).join(',\n')}
};

// Grouped images by type
const groupedImages = {
${Object.entries(groupedImages).map(([prefix, files]) => 
  `  '${prefix}': [
${files.map(file => `    '${file}'`).join(',\n')}
  ]`).join(',\n')}
};

export { imageMap, groupedImages };
`;

  // Write to file
  fs.writeFileSync(IMAGE_IMPORTS_FILE, content);
  console.log(`Generated ${IMAGE_IMPORTS_FILE} with ${imageFiles.length} image files`);
}

// Main function
function main() {
  try {
    generateAudioImports();
    generateImageImports();
    console.log('Import files generated successfully!');
  } catch (error) {
    console.error('Error generating import files:', error);
  }
}

main(); 