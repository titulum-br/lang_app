const fs = require('fs');
const path = require('path');

const imageMapping = {
  // Garfo (Fork)
  'ComfyUI_00780_.png': 'objeto-talher-garfo-1.png',
  'ComfyUI_00781_.png': 'objeto-talher-garfo-2.png',
  'ComfyUI_00782_.png': 'objeto-talher-garfo-3.png',
  
  // Colher (Spoon)
  'ComfyUI_00788_.png': 'objeto-talher-colher-1.png',
  'ComfyUI_00789_.png': 'objeto-talher-colher-2.png',
  'ComfyUI_00790_.png': 'objeto-talher-colher-3.png',
  'ComfyUI_00791_.png': 'objeto-talher-colher-4.png',
  'ComfyUI_00792_.png': 'objeto-talher-colher-5.png',
  'ComfyUI_00793_.png': 'objeto-talher-colher-6.png',
  'ComfyUI_00794_.png': 'objeto-talher-colher-7.png',
  
  // Mesa (Table)
  'ComfyUI_00747_.png': 'objeto-movel-mesa-1.png',
  'ComfyUI_00753_.png': 'objeto-movel-mesa-2.png',
  
  // Girassol (Sunflower) - Realistic
  'ComfyUI_00899_.png': 'objeto-flor-girassol-1.png',
  'ComfyUI_00900_.png': 'objeto-flor-girassol-2.png',
  'ComfyUI_00901_.png': 'objeto-flor-girassol-3.png',
  
  // Girassol (Sunflower) - Cartoon
  'ComfyUI_00903_.png': 'objeto-flor-girassol-cartoon-1.png',
  'ComfyUI_00904_.png': 'objeto-flor-girassol-cartoon-2.png',
  'ComfyUI_00905_.png': 'objeto-flor-girassol-cartoon-3.png'
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