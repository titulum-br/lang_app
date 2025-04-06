/**
 * This script reads the `icon.svg` file from the `../assets` directory
 * and uses the `sharp` library to convert it into multiple PNG files
 * (`icon.png`, `splash.png`, `adaptive-icon.png`, `favicon.png`) 
 * at specified sizes.
 * The generated PNG files are saved back into the `../assets` directory.
 * This is likely used to generate the necessary app icon and splash screen formats for Expo.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'icon.png': 1024,
  'splash.png': 1242,
  'adaptive-icon.png': 1024,
  'favicon.png': 32
};

async function convertIcons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../assets/icon.svg'));
  
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, '../assets', filename));
    console.log(`Created ${filename}`);
  }
}

convertIcons().catch(console.error); 