const fs = require('fs');
const path = require('path');

const imageMapping = {
  // Violao (Guitar) - Realistic
  'ComfyUI_00819_.png': 'objeto-instrumento-violao-1.png',
  'ComfyUI_00820_.png': 'objeto-instrumento-violao-2.png',
  'ComfyUI_00821_.png': 'objeto-instrumento-violao-3.png',
  'ComfyUI_00822_.png': 'objeto-instrumento-violao-4.png',
  
  // Violao (Guitar) - Cartoon
  'ComfyUI_00823_.png': 'objeto-instrumento-violao-cartoon-1.png',
  
  // Piano - Realistic
  'ComfyUI_00827_.png': 'objeto-instrumento-piano-1.png',
  'ComfyUI_00828_.png': 'objeto-instrumento-piano-2.png',
  'ComfyUI_00829_.png': 'objeto-instrumento-piano-3.png',
  'ComfyUI_00830_.png': 'objeto-instrumento-piano-4.png',
  
  // Piano - Cartoon
  'ComfyUI_00831_.png': 'objeto-instrumento-piano-cartoon-1.png',
  'ComfyUI_00832_.png': 'objeto-instrumento-piano-cartoon-2.png',
  'ComfyUI_00833_.png': 'objeto-instrumento-piano-cartoon-3.png',
  'ComfyUI_00834_.png': 'objeto-instrumento-piano-cartoon-4.png',
  
  // Violino (Violin) - Realistic
  'ComfyUI_00835_.png': 'objeto-instrumento-violino-1.png',
  'ComfyUI_00836_.png': 'objeto-instrumento-violino-2.png',
  'ComfyUI_00837_.png': 'objeto-instrumento-violino-3.png',
  'ComfyUI_00838_.png': 'objeto-instrumento-violino-4.png',
  
  // Violino (Violin) - Cartoon
  'ComfyUI_00839_.png': 'objeto-instrumento-violino-cartoon-1.png',
  'ComfyUI_00840_.png': 'objeto-instrumento-violino-cartoon-2.png',
  'ComfyUI_00841_.png': 'objeto-instrumento-violino-cartoon-3.png',
  'ComfyUI_00842_.png': 'objeto-instrumento-violino-cartoon-4.png',
  
  // Bateria (Drums) - Realistic
  'ComfyUI_00843_.png': 'objeto-instrumento-bateria-1.png',
  
  // Bateria (Drums) - Cartoon
  'ComfyUI_00847_.png': 'objeto-instrumento-bateria-cartoon-1.png',
  'ComfyUI_00848_.png': 'objeto-instrumento-bateria-cartoon-2.png',
  'ComfyUI_00849_.png': 'objeto-instrumento-bateria-cartoon-3.png',
  'ComfyUI_00850_.png': 'objeto-instrumento-bateria-cartoon-4.png',
  
  // Saxofone (Saxophone) - Realistic
  'ComfyUI_00851_.png': 'objeto-instrumento-saxofone-1.png',
  'ComfyUI_00852_.png': 'objeto-instrumento-saxofone-2.png',
  'ComfyUI_00853_.png': 'objeto-instrumento-saxofone-3.png',
  'ComfyUI_00854_.png': 'objeto-instrumento-saxofone-4.png',
  
  // Saxofone (Saxophone) - Cartoon
  'ComfyUI_00855_.png': 'objeto-instrumento-saxofone-cartoon-1.png',
  'ComfyUI_00856_.png': 'objeto-instrumento-saxofone-cartoon-2.png',
  'ComfyUI_00857_.png': 'objeto-instrumento-saxofone-cartoon-3.png',
  'ComfyUI_00858_.png': 'objeto-instrumento-saxofone-cartoon-4.png'
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