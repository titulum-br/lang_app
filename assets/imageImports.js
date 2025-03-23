/**
 * imageImports.js
 * 
 * This file centralizes all image imports for the Flashcard app.
 * PROPRIETARY AND CONFIDENTIAL
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * All rights reserved.
 */

// Create a static image map with only existing images
const imageMap = {
  // Animals - Ovelha
  'objeto-animal-ovelha-1.png': require('./images/objeto-animal-ovelha-1.png'),
  'objeto-animal-ovelha-2.png': require('./images/objeto-animal-ovelha-2.png'),
  'objeto-animal-ovelha-3.png': require('./images/objeto-animal-ovelha-3.png'),
  'objeto-animal-ovelha-cartoon-1.png': require('./images/objeto-animal-ovelha-cartoon-1.png'),
  'objeto-animal-ovelha-cartoon-2.png': require('./images/objeto-animal-ovelha-cartoon-2.png'),
  'objeto-animal-ovelha-cartoon-3.png': require('./images/objeto-animal-ovelha-cartoon-3.png'),
  'objeto-animal-ovelha-cartoon-4.png': require('./images/objeto-animal-ovelha-cartoon-4.png'),

  // Animals - Cavalo
  'objeto-animal-cavalo-1.png': require('./images/objeto-animal-cavalo-1.png'),
  'objeto-animal-cavalo-2.png': require('./images/objeto-animal-cavalo-2.png'),
  'objeto-animal-cavalo-3.png': require('./images/objeto-animal-cavalo-3.png'),
  'objeto-animal-cavalo-4.png': require('./images/objeto-animal-cavalo-4.png'),
  'objeto-animal-cavalo-cartoon-1.png': require('./images/objeto-animal-cavalo-cartoon-1.png'),
  'objeto-animal-cavalo-cartoon-2.png': require('./images/objeto-animal-cavalo-cartoon-2.png'),
  'objeto-animal-cavalo-cartoon-3.png': require('./images/objeto-animal-cavalo-cartoon-3.png'),
  'objeto-animal-cavalo-cartoon-4.png': require('./images/objeto-animal-cavalo-cartoon-4.png'),

  // Animals - Borboleta
  'objeto-animal-borboleta-1.png': require('./images/objeto-animal-borboleta-1.png'),
  'objeto-animal-borboleta-2.png': require('./images/objeto-animal-borboleta-2.png'),
  'objeto-animal-borboleta-3.png': require('./images/objeto-animal-borboleta-3.png'),
  'objeto-animal-borboleta-4.png': require('./images/objeto-animal-borboleta-4.png'),
  'objeto-animal-borboleta-cartoon-1.png': require('./images/objeto-animal-borboleta-cartoon-1.png'),
  'objeto-animal-borboleta-cartoon-2.png': require('./images/objeto-animal-borboleta-cartoon-2.png'),
  'objeto-animal-borboleta-cartoon-3.png': require('./images/objeto-animal-borboleta-cartoon-3.png'),
  'objeto-animal-borboleta-cartoon-4.png': require('./images/objeto-animal-borboleta-cartoon-4.png'),

  // Animals - Porco
  'objeto-animal-porco-1.png': require('./images/objeto-animal-porco-1.png'),
  'objeto-animal-porco-2.png': require('./images/objeto-animal-porco-2.png'),
  'objeto-animal-porco-3.png': require('./images/objeto-animal-porco-3.png'),
  'objeto-animal-porco-4.png': require('./images/objeto-animal-porco-4.png'),
  'objeto-animal-porco-cartoon-1.png': require('./images/objeto-animal-porco-cartoon-1.png'),
  'objeto-animal-porco-cartoon-2.png': require('./images/objeto-animal-porco-cartoon-2.png'),
  'objeto-animal-porco-cartoon-3.png': require('./images/objeto-animal-porco-cartoon-3.png'),

  // Animals - Galinha
  'objeto-animal-galinha-1.png': require('./images/objeto-animal-galinha-1.png'),
  'objeto-animal-galinha-2.png': require('./images/objeto-animal-galinha-2.png'),
  'objeto-animal-galinha-3.png': require('./images/objeto-animal-galinha-3.png'),

  // Animals - Vaca
  'objeto-animal-vaca-1.png': require('./images/objeto-animal-vaca-1.png'),
  'objeto-animal-vaca-2.png': require('./images/objeto-animal-vaca-2.png'),
  'objeto-animal-vaca-3.png': require('./images/objeto-animal-vaca-3.png'),
  'objeto-animal-vaca-4.png': require('./images/objeto-animal-vaca-4.png'),
  'objeto-animal-vaca-cartoon-1.png': require('./images/objeto-animal-vaca-cartoon-1.png'),
  'objeto-animal-vaca-cartoon-2.png': require('./images/objeto-animal-vaca-cartoon-2.png'),
  'objeto-animal-vaca-cartoon-3.png': require('./images/objeto-animal-vaca-cartoon-3.png'),
  'objeto-animal-vaca-cartoon-4.png': require('./images/objeto-animal-vaca-cartoon-4.png'),

  // Animals - Abelha
  'objeto-animal-abelha-1.png': require('./images/objeto-animal-abelha-1.png'),
  'objeto-animal-abelha-2.png': require('./images/objeto-animal-abelha-2.png'),
  'objeto-animal-abelha-3.png': require('./images/objeto-animal-abelha-3.png'),
  'objeto-animal-abelha-4.png': require('./images/objeto-animal-abelha-4.png'),
  'objeto-animal-abelha-cartoon-1.png': require('./images/objeto-animal-abelha-cartoon-1.png'),
  'objeto-animal-abelha-cartoon-2.png': require('./images/objeto-animal-abelha-cartoon-2.png'),
  'objeto-animal-abelha-cartoon-3.png': require('./images/objeto-animal-abelha-cartoon-3.png'),
  'objeto-animal-abelha-cartoon-4.png': require('./images/objeto-animal-abelha-cartoon-4.png'),

  // Flowers - Tulipa
  'objeto-flor-tulipa-1.png': require('./images/objeto-flor-tulipa-1.png'),
  'objeto-flor-tulipa-2.png': require('./images/objeto-flor-tulipa-2.png'),
  'objeto-flor-tulipa-3.png': require('./images/objeto-flor-tulipa-3.png'),
  'objeto-flor-tulipa-4.png': require('./images/objeto-flor-tulipa-4.png'),
  'objeto-flor-tulipa-cartoon-1.png': require('./images/objeto-flor-tulipa-cartoon-1.png'),
  'objeto-flor-tulipa-cartoon-2.png': require('./images/objeto-flor-tulipa-cartoon-2.png'),
  'objeto-flor-tulipa-cartoon-3.png': require('./images/objeto-flor-tulipa-cartoon-3.png'),
  'objeto-flor-tulipa-cartoon-4.png': require('./images/objeto-flor-tulipa-cartoon-4.png'),

  // Flowers - Rosa
  'objeto-flor-rosa-1.png': require('./images/objeto-flor-rosa-1.png'),
  'objeto-flor-rosa-2.png': require('./images/objeto-flor-rosa-2.png'),
  'objeto-flor-rosa-3.png': require('./images/objeto-flor-rosa-3.png'),
  'objeto-flor-rosa-4.png': require('./images/objeto-flor-rosa-4.png'),
  'objeto-flor-rosa-cartoon-1.png': require('./images/objeto-flor-rosa-cartoon-1.png'),
  'objeto-flor-rosa-cartoon-2.png': require('./images/objeto-flor-rosa-cartoon-2.png'),
  'objeto-flor-rosa-cartoon-3.png': require('./images/objeto-flor-rosa-cartoon-3.png'),
  'objeto-flor-rosa-cartoon-4.png': require('./images/objeto-flor-rosa-cartoon-4.png'),

  // Sky - Lua
  'objeto-ceu-lua-1.png': require('./images/objeto-ceu-lua-1.png'),
  'objeto-ceu-lua-2.png': require('./images/objeto-ceu-lua-2.png'),
  'objeto-ceu-lua-3.png': require('./images/objeto-ceu-lua-3.png'),
  'objeto-ceu-lua-4.png': require('./images/objeto-ceu-lua-4.png'),
  'objeto-ceu-lua-cartoon-1.png': require('./images/objeto-ceu-lua-cartoon-1.png'),
  'objeto-ceu-lua-cartoon-2.png': require('./images/objeto-ceu-lua-cartoon-2.png'),
  'objeto-ceu-lua-cartoon-4.png': require('./images/objeto-ceu-lua-cartoon-4.png'),

  // Furniture
  'objeto-movel-cama-1.png': require('./images/objeto-movel-cama-1.png'),
  'objeto-movel-mesa-1.png': require('./images/objeto-movel-mesa-1.png'),
  'objeto-movel-mesa-2.png': require('./images/objeto-movel-mesa-2.png'),
  'objeto-movel-mesa-3.png': require('./images/objeto-movel-mesa-3.png'),

  // Kitchen - Pratos
  'objeto-cozinha-prato-4.png': require('./images/objeto-cozinha-prato-4.png'),
  'objeto-cozinha-prato-5.png': require('./images/objeto-cozinha-prato-5.png'),
  'objeto-cozinha-prato-6.png': require('./images/objeto-cozinha-prato-6.png'),
  'objeto-cozinha-prato-7.png': require('./images/objeto-cozinha-prato-7.png'),

  // Instruments - Violao (Guitar)
  'objeto-instrumento-violao-1.png': require('./images/objeto-instrumento-violao-1.png'),
  'objeto-instrumento-violao-2.png': require('./images/objeto-instrumento-violao-2.png'),
  'objeto-instrumento-violao-3.png': require('./images/objeto-instrumento-violao-3.png'),
  'objeto-instrumento-violao-4.png': require('./images/objeto-instrumento-violao-4.png'),
  'objeto-instrumento-violao-cartoon-1.png': require('./images/objeto-instrumento-violao-cartoon-1.png'),
  
  // Instruments - Piano
  'objeto-instrumento-piano-1.png': require('./images/objeto-instrumento-piano-1.png'),
  'objeto-instrumento-piano-2.png': require('./images/objeto-instrumento-piano-2.png'),
  'objeto-instrumento-piano-3.png': require('./images/objeto-instrumento-piano-3.png'),
  'objeto-instrumento-piano-4.png': require('./images/objeto-instrumento-piano-4.png'),
  'objeto-instrumento-piano-cartoon-1.png': require('./images/objeto-instrumento-piano-cartoon-1.png'),
  'objeto-instrumento-piano-cartoon-2.png': require('./images/objeto-instrumento-piano-cartoon-2.png'),
  'objeto-instrumento-piano-cartoon-3.png': require('./images/objeto-instrumento-piano-cartoon-3.png'),
  'objeto-instrumento-piano-cartoon-4.png': require('./images/objeto-instrumento-piano-cartoon-4.png'),
  
  // Instruments - Violino (Violin)
  'objeto-instrumento-violino-1.png': require('./images/objeto-instrumento-violino-1.png'),
  'objeto-instrumento-violino-2.png': require('./images/objeto-instrumento-violino-2.png'),
  'objeto-instrumento-violino-3.png': require('./images/objeto-instrumento-violino-3.png'),
  'objeto-instrumento-violino-4.png': require('./images/objeto-instrumento-violino-4.png'),
  'objeto-instrumento-violino-cartoon-1.png': require('./images/objeto-instrumento-violino-cartoon-1.png'),
  'objeto-instrumento-violino-cartoon-2.png': require('./images/objeto-instrumento-violino-cartoon-2.png'),
  'objeto-instrumento-violino-cartoon-3.png': require('./images/objeto-instrumento-violino-cartoon-3.png'),
  'objeto-instrumento-violino-cartoon-4.png': require('./images/objeto-instrumento-violino-cartoon-4.png'),
  
  // Instruments - Bateria (Drums)
  'objeto-instrumento-bateria-1.png': require('./images/objeto-instrumento-bateria-1.png'),
  'objeto-instrumento-bateria-cartoon-1.png': require('./images/objeto-instrumento-bateria-cartoon-1.png'),
  'objeto-instrumento-bateria-cartoon-2.png': require('./images/objeto-instrumento-bateria-cartoon-2.png'),
  'objeto-instrumento-bateria-cartoon-3.png': require('./images/objeto-instrumento-bateria-cartoon-3.png'),
  'objeto-instrumento-bateria-cartoon-4.png': require('./images/objeto-instrumento-bateria-cartoon-4.png'),
  
  // Instruments - Saxofone (Saxophone)
  'objeto-instrumento-saxofone-1.png': require('./images/objeto-instrumento-saxofone-1.png'),
  'objeto-instrumento-saxofone-2.png': require('./images/objeto-instrumento-saxofone-2.png'),
  'objeto-instrumento-saxofone-3.png': require('./images/objeto-instrumento-saxofone-3.png'),
  'objeto-instrumento-saxofone-4.png': require('./images/objeto-instrumento-saxofone-4.png'),
  'objeto-instrumento-saxofone-cartoon-1.png': require('./images/objeto-instrumento-saxofone-cartoon-1.png'),
  'objeto-instrumento-saxofone-cartoon-2.png': require('./images/objeto-instrumento-saxofone-cartoon-2.png'),
  'objeto-instrumento-saxofone-cartoon-3.png': require('./images/objeto-instrumento-saxofone-cartoon-3.png'),
  'objeto-instrumento-saxofone-cartoon-4.png': require('./images/objeto-instrumento-saxofone-cartoon-4.png'),

  // Flowers - Girassol (Sunflower)
  'objeto-flor-girassol-1.png': require('./images/objeto-flor-girassol-1.png'),
  'objeto-flor-girassol-2.png': require('./images/objeto-flor-girassol-2.png'),
  'objeto-flor-girassol-3.png': require('./images/objeto-flor-girassol-3.png'),
  'objeto-flor-girassol-cartoon-1.png': require('./images/objeto-flor-girassol-cartoon-1.png'),
  'objeto-flor-girassol-cartoon-2.png': require('./images/objeto-flor-girassol-cartoon-2.png'),
  'objeto-flor-girassol-cartoon-3.png': require('./images/objeto-flor-girassol-cartoon-3.png'),

  // Utensils - Garfo (Fork)
  'objeto-talher-garfo-1.png': require('./images/objeto-talher-garfo-1.png'),
  'objeto-talher-garfo-3.png': require('./images/objeto-talher-garfo-3.png'),

  // Utensils - Colher (Spoon)
  'objeto-talher-colher-1.png': require('./images/objeto-talher-colher-1.png'),
  'objeto-talher-colher-2.png': require('./images/objeto-talher-colher-2.png'),
  'objeto-talher-colher-3.png': require('./images/objeto-talher-colher-3.png'),
  'objeto-talher-colher-4.png': require('./images/objeto-talher-colher-4.png'),
  'objeto-talher-colher-5.png': require('./images/objeto-talher-colher-5.png'),
  'objeto-talher-colher-6.png': require('./images/objeto-talher-colher-6.png'),
  'objeto-talher-colher-7.png': require('./images/objeto-talher-colher-7.png'),
};

export { imageMap }; 