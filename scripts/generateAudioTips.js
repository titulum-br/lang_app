const fs = require('fs');
const path = require('path');

function generateAudioTips() {
    // Read the base flashcards structure
    const flashcardsPath = path.join(__dirname, 'flashcards_base.json');
    const flashcards = JSON.parse(fs.readFileSync(flashcardsPath, 'utf8'));

    // Process each category and item
    Object.entries(flashcards).forEach(([category, items]) => {
        Object.entries(items).forEach(([name, data]) => {
            // Only generate tips for items that don't have them
            if (!data.tip) {
                // Simple rule: use first syllable
                const tip = name.slice(0, 2); // You might want to make this more sophisticated
                flashcards[category][name].tip = tip;
                flashcards[category][name].audioSyllable = `audio-syllable-pt_br-${name}-${tip}`;
            }
        });
    });

    // Write back to the file
    fs.writeFileSync(
        flashcardsPath,
        JSON.stringify(flashcards, null, 2)
    );

    console.log('Audio tips generated for new items!');
    return flashcards;
}

if (require.main === module) {
    generateAudioTips();
}

module.exports = { generateAudioTips }; 