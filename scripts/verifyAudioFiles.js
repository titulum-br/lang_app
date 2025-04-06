/**
 * This script verifies the audio files in the `../assets/audio` directory
 * against the expected files defined in `../assets/images/flashcards.json`.
 * 
 * It checks for:
 * 1. Missing Files: Compares expected filenames (based on flashcard items, tips,
 *    voice name, and sample count) against existing files.
 * 2. Extra Files: Identifies any .mp3 files in the audio directory that don't
 *    match the expected naming convention or items in the flashcards JSON.
 * 3. File Size: Calculates average file size and flags any suspiciously small files
 *    which might indicate corrupted or incomplete generation.
 * 
 * The results are printed to the console.
 */

/**
 * Audio File Verification Script
 * 
 * This script verifies that audio files have been generated correctly for all flashcards.
 * It checks that each flashcard has the proper audio files generated according to the naming convention.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const FLASHCARDS_PATH = path.join(__dirname, '../assets/images/flashcards.json');
const AUDIO_DIR = path.join(__dirname, '../assets/audio');
const NUM_SAMPLES = 3; // Number of expected audio variations
const VOICE_NAME = 'klaus'; // Voice name used in file naming

// Function to extract all expected audio files from flashcards.json
function getExpectedAudioFiles() {
  try {
    const flashcardsData = JSON.parse(fs.readFileSync(FLASHCARDS_PATH, 'utf8'));
    const expectedFiles = [];
    
    // Loop through all categories and items
    Object.entries(flashcardsData).forEach(([category, items]) => {
      Object.entries(items).forEach(([key, item]) => {
        if (item.tip) {
          // Add syllable audio files
          for (let i = 1; i <= NUM_SAMPLES; i++) {
            expectedFiles.push({
              type: 'syllable',
              filePath: `audio-syllable-pt_br-${key}-${item.tip.toLowerCase()}-${VOICE_NAME}-${i}.mp3`,
              category,
              item: key
            });
          }
        }
        
        // Add word audio files
        for (let i = 1; i <= NUM_SAMPLES; i++) {
          expectedFiles.push({
            type: 'word',
            filePath: `audio-word-pt_br-${key}-${VOICE_NAME}-${i}.mp3`,
            category,
            item: key
          });
        }
      });
    });
    
    return expectedFiles;
  } catch (error) {
    console.error('Error reading flashcards file:', error);
    return [];
  }
}

// Function to get all existing audio files
function getExistingAudioFiles() {
  try {
    if (!fs.existsSync(AUDIO_DIR)) {
      return [];
    }
    
    return fs.readdirSync(AUDIO_DIR)
      .filter(file => file.endsWith('.mp3'))
      .map(file => ({
        filePath: file,
        fullPath: path.join(AUDIO_DIR, file)
      }));
  } catch (error) {
    console.error('Error reading audio directory:', error);
    return [];
  }
}

// Main verification function
function verifyAudioFiles() {
  console.log('Starting audio file verification...');
  
  // Get expected and existing files
  const expectedFiles = getExpectedAudioFiles();
  const existingFiles = getExistingAudioFiles();
  
  console.log(`Found ${expectedFiles.length} expected audio files`);
  console.log(`Found ${existingFiles.length} existing audio files`);
  
  // Check for missing files
  const missingFiles = [];
  expectedFiles.forEach(expected => {
    if (!existingFiles.some(existing => existing.filePath === expected.filePath)) {
      missingFiles.push(expected);
    }
  });
  
  // Check for extra files
  const extraFiles = [];
  existingFiles.forEach(existing => {
    if (!expectedFiles.some(expected => expected.filePath === existing.filePath)) {
      extraFiles.push(existing);
    }
  });
  
  // Group missing files by item for better reporting
  const missingByItem = {};
  missingFiles.forEach(file => {
    const key = `${file.category} - ${file.item}`;
    if (!missingByItem[key]) {
      missingByItem[key] = [];
    }
    missingByItem[key].push(file);
  });
  
  // Report results
  console.log('\n--- Verification Results ---');
  
  if (missingFiles.length === 0) {
    console.log('✅ All expected audio files are present!');
  } else {
    console.log(`❌ Missing ${missingFiles.length} expected audio files:`);
    Object.entries(missingByItem).forEach(([key, files]) => {
      console.log(`  ${key}: ${files.length} files`);
      files.forEach(file => {
        console.log(`    - ${file.filePath}`);
      });
    });
  }
  
  if (extraFiles.length > 0) {
    console.log(`\n⚠️ Found ${extraFiles.length} unexpected audio files:`);
    extraFiles.forEach(file => {
      console.log(`  - ${file.filePath}`);
    });
  }
  
  // File size check
  if (existingFiles.length > 0) {
    console.log('\n--- File Size Analysis ---');
    
    // Get file stats
    const fileSizes = existingFiles.map(file => {
      const stats = fs.statSync(file.fullPath);
      return {
        ...file,
        size: stats.size
      };
    });
    
    // Calculate average file size
    const totalSize = fileSizes.reduce((sum, file) => sum + file.size, 0);
    const averageSize = totalSize / fileSizes.length;
    
    // Find suspiciously small files (possibly malformed)
    const smallFiles = fileSizes.filter(file => file.size < averageSize * 0.2);
    
    console.log(`Average file size: ${(averageSize / 1024).toFixed(2)} KB`);
    console.log(`Total storage used: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    if (smallFiles.length > 0) {
      console.log(`\n⚠️ Found ${smallFiles.length} suspiciously small files:`);
      smallFiles.forEach(file => {
        console.log(`  - ${file.filePath} (${(file.size / 1024).toFixed(2)} KB)`);
      });
    }
  }
  
  console.log('\nVerification complete!');
}

// Run the verification
verifyAudioFiles(); 