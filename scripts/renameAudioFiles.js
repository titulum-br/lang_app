/**
 * Script to rename audio files by removing accents from syllable names
 */

const fs = require('fs');
const path = require('path');

// Accent mapping
const accentMap = {
  'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a',
  'é': 'e', 'è': 'e', 'ê': 'e',
  'í': 'i', 'ì': 'i', 'î': 'i',
  'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o',
  'ú': 'u', 'ù': 'u', 'û': 'u',
  'ç': 'c'
};

// Function to remove accents from a string
function removeAccents(str) {
  return str.split('').map(char => accentMap[char] || char).join('');
}

// Function to rename files
function renameAudioFiles() {
  const audioDir = path.join(__dirname, '../assets/audio');
  
  // Read all files in the audio directory
  fs.readdir(audioDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    
    // Filter for syllable audio files
    const syllableFiles = files.filter(file => 
      file.startsWith('audio-syllable-pt_br-') && 
      file.endsWith('.mp3')
    );
    
    console.log(`Found ${syllableFiles.length} syllable audio files`);
    
    // Process each file
    syllableFiles.forEach(file => {
      // Split the filename into parts
      const parts = file.split('-');
      
      // Find the syllable part (it's the part before 'klaus')
      const syllableIndex = parts.findIndex(part => part === 'klaus') - 1;
      
      if (syllableIndex >= 0) {
        const syllable = parts[syllableIndex];
        const newSyllable = removeAccents(syllable);
        
        // Only rename if the syllable has accents
        if (syllable !== newSyllable) {
          // Create new filename
          parts[syllableIndex] = newSyllable;
          const newFilename = parts.join('-');
          
          // Full paths
          const oldPath = path.join(audioDir, file);
          const newPath = path.join(audioDir, newFilename);
          
          // Rename the file
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error(`Error renaming ${file}:`, err);
            } else {
              console.log(`Renamed: ${file} -> ${newFilename}`);
            }
          });
        }
      }
    });
  });
}

// Run the script
console.log('Starting audio file renaming...');
renameAudioFiles();
console.log('Script completed. Check the console for results.'); 