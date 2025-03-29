const fs = require('fs');
const path = require('path');

function scanGeneratedImages() {
    const imagesDir = path.join(__dirname, 'generated_images');
    const images = fs.readdirSync(imagesDir);
    
    // Group images by their base name (without the number suffix)
    const groupedImages = {};
    images.forEach(image => {
        // Parse filename pattern: objeto-category-name-number.png
        const match = image.match(/objeto-(\w+)-(\w+)-\d+\.png/);
        if (match) {
            const [_, category, name] = match;
            if (!groupedImages[category]) {
                groupedImages[category] = {};
            }
            if (!groupedImages[category][name]) {
                groupedImages[category][name] = {
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    images: `objeto-${category}-${name}`,
                    audioWord: `audio-word-pt_br-${name}`,
                    audioSyllable: null, // To be filled by audio tip generator
                    tip: null // To be filled by audio tip generator
                };
            }
        }
    });

    // Write to intermediate JSON file
    fs.writeFileSync(
        path.join(__dirname, 'flashcards_base.json'),
        JSON.stringify(groupedImages, null, 2)
    );

    console.log('Base flashcards structure generated from images!');
    return groupedImages;
}

if (require.main === module) {
    scanGeneratedImages();
}

module.exports = { scanGeneratedImages }; 