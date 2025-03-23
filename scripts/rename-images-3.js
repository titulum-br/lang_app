const fs = require('fs');
const path = require('path');

const imageMapping = {
  // Bee - Realistic
  'ComfyUI_00923_.png': 'objeto-animal-abelha-1.png',
  'ComfyUI_00924_.png': 'objeto-animal-abelha-2.png',
  'ComfyUI_00925_.png': 'objeto-animal-abelha-3.png',
  'ComfyUI_00926_.png': 'objeto-animal-abelha-4.png',
  
  // Bee - Cartoon
  'ComfyUI_00927_.png': 'objeto-animal-abelha-cartoon-1.png',
  'ComfyUI_00928_.png': 'objeto-animal-abelha-cartoon-2.png',
  'ComfyUI_00929_.png': 'objeto-animal-abelha-cartoon-3.png',
  'ComfyUI_00930_.png': 'objeto-animal-abelha-cartoon-4.png',
  
  // Moon - Realistic
  'ComfyUI_00931_.png': 'objeto-ceu-lua-1.png',
  'ComfyUI_00932_.png': 'objeto-ceu-lua-2.png',
  'ComfyUI_00933_.png': 'objeto-ceu-lua-3.png',
  'ComfyUI_00934_.png': 'objeto-ceu-lua-4.png',
  
  // Moon - Cartoon
  'ComfyUI_00935_.png': 'objeto-ceu-lua-cartoon-1.png',
  'ComfyUI_00936_.png': 'objeto-ceu-lua-cartoon-2.png',
  'ComfyUI_00937_.png': 'objeto-ceu-lua-cartoon-3.png', // Note: This file might not exist based on the listing
  'ComfyUI_00938_.png': 'objeto-ceu-lua-cartoon-4.png',
  
  // Plate
  'ComfyUI_00806_.png': 'objeto-cozinha-prato-4.png',
  'ComfyUI_00807_.png': 'objeto-cozinha-prato-5.png',
  'ComfyUI_00808_.png': 'objeto-cozinha-prato-6.png',
  'ComfyUI_00809_.png': 'objeto-cozinha-prato-7.png'
};

async function renameImages() {
  const imagesDir = path.join(__dirname, '../assets/images');
  
  for (const [oldName, newName] of Object.entries(imageMapping)) {
    const oldPath = path.join(imagesDir, oldName);
    const newPath = path.join(imagesDir, newName);
    
    try {
      if (fs.existsSync(oldPath)) {
        await fs.promises.rename(oldPath, newPath);
        console.log(`Renamed ${oldName} to ${newName}`);
      } else {
        console.log(`File not found: ${oldName}`);
      }
    } catch (error) {
      console.error(`Error renaming ${oldName}:`, error);
    }
  }
}

// Execute the rename function
renameImages().then(() => {
  console.log('Renaming completed');
}).catch(error => {
  console.error('Error during renaming:', error);
}); 