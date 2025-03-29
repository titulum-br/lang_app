const fs = require('fs');
const path = require('path');
const { scanGeneratedImages } = require('./scanGeneratedImages');
const { generateAudioTips } = require('./generateAudioTips');

function generateFinalFlashcards() {
    // First, scan for new images
    scanGeneratedImages();
    
    // Then, generate audio tips for new items
    const flashcardsWithTips = generateAudioTips();

    // Read existing flashcards.json if it exists
    let existingFlashcards = {};
    const finalPath = path.join(__dirname, '../assets/flashcards.json');
    if (fs.existsSync(finalPath)) {
        existingFlashcards = JSON.parse(fs.readFileSync(finalPath, 'utf8'));
    }

    // Merge existing and new flashcards
    const mergedFlashcards = {
        ...existingFlashcards,
        ...flashcardsWithTips
    };

    // Write final flashcards.json
    fs.writeFileSync(
        finalPath,
        JSON.stringify(mergedFlashcards, null, 2)
    );

    console.log('Final flashcards.json generated successfully!');
}

generateFinalFlashcards(); 