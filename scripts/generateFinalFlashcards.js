/**
 * This script orchestrates the generation of the final flashcards.json file.
 * It first scans for newly generated images to create/update flashcards_base.json.
 * It then merges the data from flashcards_base.json with any existing data
 * in the final assets/flashcards.json file.
 */

const fs = require('fs');
const path = require('path');
const { scanGeneratedImages } = require('./scanGeneratedImages');

function generateFinalFlashcards() {
    // First, scan for new images and update flashcards_base.json
    console.log('Scanning generated images...');
    scanGeneratedImages();
    
    // Read the base data potentially updated by scanGeneratedImages
    console.log('Reading base flashcard data...');
    const basePath = path.join(__dirname, 'flashcards_base.json');
    let baseFlashcards = {};
    if (fs.existsSync(basePath)) {
        baseFlashcards = JSON.parse(fs.readFileSync(basePath, 'utf8'));
    } else {
        console.warn('flashcards_base.json not found after scanning images.');
    }

    // Read existing final flashcards.json if it exists
    console.log('Reading existing final flashcards.json...');
    let existingFlashcards = {};
    const finalPath = path.join(__dirname, '../assets/flashcards.json');
    if (fs.existsSync(finalPath)) {
        existingFlashcards = JSON.parse(fs.readFileSync(finalPath, 'utf8'));
    }

    // Merge existing and base flashcards
    // Note: This is a simple merge. Consider a more sophisticated strategy
    // if you need to preserve specific data from existingFlashcards.
    console.log('Merging base data with final data...');
    const mergedFlashcards = {
        ...existingFlashcards,
        ...baseFlashcards // Data from flashcards_base potentially overwrites existing
    };

    // Write final flashcards.json
    console.log('Writing final flashcards.json...');
    fs.writeFileSync(
        finalPath,
        JSON.stringify(mergedFlashcards, null, 2)
    );

    console.log('Final flashcards.json generated successfully!');
}

generateFinalFlashcards(); 