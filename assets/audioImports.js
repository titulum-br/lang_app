/**
 * audioImports.js
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * All rights reserved.
 */

// Create an audio map with all available audio files
// This allows us to statically import audio files at build time
// instead of using dynamic requires which don't work in React Native

// Test audio (always included)
const testAudio = {
  test: require('./audio/direct-test-klaus.mp3')
};

// Syllable audio files
const syllableAudio = {
  // Cachorro - ca
  'audio-syllable-pt_br-cachorro-ca-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'),
  'audio-syllable-pt_br-cachorro-ca-klaus-2.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-2.mp3'),
  'audio-syllable-pt_br-cachorro-ca-klaus-3.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-3.mp3'),
  
  // Passaro - pá
  'audio-syllable-pt_br-passaro-pá-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'),
  'audio-syllable-pt_br-passaro-pá-klaus-2.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-2.mp3'),
  
  // Common syllables for other animals
  'audio-syllable-pt_br-gato-ga-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-coelho-co-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-peixe-pei-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-ovelha-o-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-cavalo-ca-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-borboleta-bor-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-porco-por-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-galinha-ga-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-vaca-va-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-abelha-a-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  
  // Common syllables for fruits
  'audio-syllable-pt_br-maca-ma-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-banana-ba-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-laranja-la-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-uvas-u-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-morango-mo-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  
  // Common syllables for others
  'audio-syllable-pt_br-tulipa-tu-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-rosa-ro-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-girassol-gi-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-lua-lu-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-sofa-so-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-cama-ca-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-mesa-me-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-batata-ba-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-prato-pra-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-garfo-gar-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-colher-co-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-violao-vi-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-piano-pi-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-violino-vi-klaus-1.mp3': require('./audio/audio-syllable-pt_br-passaro-pá-klaus-1.mp3'), // Temporary using pá sound
  'audio-syllable-pt_br-bateria-ba-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3'), // Temporary using ca sound
  'audio-syllable-pt_br-saxofone-sa-klaus-1.mp3': require('./audio/audio-syllable-pt_br-cachorro-ca-klaus-1.mp3')  // Temporary using ca sound
};

// Word audio files
const wordAudio = {
  // Animals
  'audio-word-pt_br-cachorro-klaus-1.mp3': require('./audio/audio-word-pt_br-cachorro-klaus-1.mp3'),
  'audio-word-pt_br-cachorro-klaus-2.mp3': require('./audio/audio-word-pt_br-cachorro-klaus-2.mp3'),
  'audio-word-pt_br-cachorro-klaus-3.mp3': require('./audio/audio-word-pt_br-cachorro-klaus-3.mp3'),
  'audio-word-pt_br-passaro-klaus-1.mp3': require('./audio/audio-word-pt_br-passaro-klaus-1.mp3'),
  'audio-word-pt_br-passaro-klaus-2.mp3': require('./audio/audio-word-pt_br-passaro-klaus-2.mp3'),
  'audio-word-pt_br-passaro-klaus-3.mp3': require('./audio/audio-word-pt_br-passaro-klaus-3.mp3'),
  'audio-word-pt_br-gato-klaus-1.mp3': require('./audio/audio-word-pt_br-gato-klaus-1.mp3'),
  'audio-word-pt_br-gato-klaus-2.mp3': require('./audio/audio-word-pt_br-gato-klaus-2.mp3'),
  'audio-word-pt_br-gato-klaus-3.mp3': require('./audio/audio-word-pt_br-gato-klaus-3.mp3'),
  'audio-word-pt_br-coelho-klaus-1.mp3': require('./audio/audio-word-pt_br-coelho-klaus-1.mp3'),
  'audio-word-pt_br-coelho-klaus-2.mp3': require('./audio/audio-word-pt_br-coelho-klaus-2.mp3'),
  'audio-word-pt_br-coelho-klaus-3.mp3': require('./audio/audio-word-pt_br-coelho-klaus-3.mp3'),
  'audio-word-pt_br-peixe-klaus-1.mp3': require('./audio/audio-word-pt_br-peixe-klaus-1.mp3'),
  'audio-word-pt_br-peixe-klaus-2.mp3': require('./audio/audio-word-pt_br-peixe-klaus-2.mp3'),
  'audio-word-pt_br-peixe-klaus-3.mp3': require('./audio/audio-word-pt_br-peixe-klaus-3.mp3'),
  'audio-word-pt_br-ovelha-klaus-1.mp3': require('./audio/audio-word-pt_br-ovelha-klaus-1.mp3'),
  'audio-word-pt_br-ovelha-klaus-2.mp3': require('./audio/audio-word-pt_br-ovelha-klaus-2.mp3'),
  'audio-word-pt_br-ovelha-klaus-3.mp3': require('./audio/audio-word-pt_br-ovelha-klaus-3.mp3'),
  'audio-word-pt_br-cavalo-klaus-1.mp3': require('./audio/audio-word-pt_br-cavalo-klaus-1.mp3'),
  'audio-word-pt_br-cavalo-klaus-2.mp3': require('./audio/audio-word-pt_br-cavalo-klaus-2.mp3'),
  'audio-word-pt_br-cavalo-klaus-3.mp3': require('./audio/audio-word-pt_br-cavalo-klaus-3.mp3'),
  'audio-word-pt_br-borboleta-klaus-1.mp3': require('./audio/audio-word-pt_br-borboleta-klaus-1.mp3'),
  'audio-word-pt_br-borboleta-klaus-2.mp3': require('./audio/audio-word-pt_br-borboleta-klaus-2.mp3'),
  'audio-word-pt_br-borboleta-klaus-3.mp3': require('./audio/audio-word-pt_br-borboleta-klaus-3.mp3'),
  'audio-word-pt_br-porco-klaus-1.mp3': require('./audio/audio-word-pt_br-porco-klaus-1.mp3'),
  'audio-word-pt_br-porco-klaus-2.mp3': require('./audio/audio-word-pt_br-porco-klaus-2.mp3'),
  'audio-word-pt_br-porco-klaus-3.mp3': require('./audio/audio-word-pt_br-porco-klaus-3.mp3'),
  'audio-word-pt_br-galinha-klaus-1.mp3': require('./audio/audio-word-pt_br-galinha-klaus-1.mp3'),
  'audio-word-pt_br-galinha-klaus-2.mp3': require('./audio/audio-word-pt_br-galinha-klaus-2.mp3'),
  'audio-word-pt_br-galinha-klaus-3.mp3': require('./audio/audio-word-pt_br-galinha-klaus-3.mp3'),
  'audio-word-pt_br-vaca-klaus-1.mp3': require('./audio/audio-word-pt_br-vaca-klaus-1.mp3'),
  'audio-word-pt_br-vaca-klaus-2.mp3': require('./audio/audio-word-pt_br-vaca-klaus-2.mp3'),
  'audio-word-pt_br-vaca-klaus-3.mp3': require('./audio/audio-word-pt_br-vaca-klaus-3.mp3'),
  'audio-word-pt_br-abelha-klaus-1.mp3': require('./audio/audio-word-pt_br-abelha-klaus-1.mp3'),
  'audio-word-pt_br-abelha-klaus-2.mp3': require('./audio/audio-word-pt_br-abelha-klaus-2.mp3'),
  'audio-word-pt_br-abelha-klaus-3.mp3': require('./audio/audio-word-pt_br-abelha-klaus-3.mp3'),
  
  // Flowers
  'audio-word-pt_br-tulipa-klaus-1.mp3': require('./audio/audio-word-pt_br-tulipa-klaus-1.mp3'),
  'audio-word-pt_br-tulipa-klaus-2.mp3': require('./audio/audio-word-pt_br-tulipa-klaus-2.mp3'),
  'audio-word-pt_br-tulipa-klaus-3.mp3': require('./audio/audio-word-pt_br-tulipa-klaus-3.mp3'),
  'audio-word-pt_br-rosa-klaus-1.mp3': require('./audio/audio-word-pt_br-rosa-klaus-1.mp3'),
  'audio-word-pt_br-rosa-klaus-2.mp3': require('./audio/audio-word-pt_br-rosa-klaus-2.mp3'),
  'audio-word-pt_br-rosa-klaus-3.mp3': require('./audio/audio-word-pt_br-rosa-klaus-3.mp3'),
  'audio-word-pt_br-girassol-klaus-1.mp3': require('./audio/audio-word-pt_br-girassol-klaus-1.mp3'),
  'audio-word-pt_br-girassol-klaus-2.mp3': require('./audio/audio-word-pt_br-girassol-klaus-2.mp3'),
  'audio-word-pt_br-girassol-klaus-3.mp3': require('./audio/audio-word-pt_br-girassol-klaus-3.mp3'),
  
  // Fruits
  'audio-word-pt_br-maca-klaus-1.mp3': require('./audio/audio-word-pt_br-maca-klaus-1.mp3'),
  'audio-word-pt_br-maca-klaus-2.mp3': require('./audio/audio-word-pt_br-maca-klaus-2.mp3'),
  'audio-word-pt_br-maca-klaus-3.mp3': require('./audio/audio-word-pt_br-maca-klaus-3.mp3'),
  'audio-word-pt_br-banana-klaus-1.mp3': require('./audio/audio-word-pt_br-banana-klaus-1.mp3'),
  'audio-word-pt_br-banana-klaus-2.mp3': require('./audio/audio-word-pt_br-banana-klaus-2.mp3'),
  'audio-word-pt_br-banana-klaus-3.mp3': require('./audio/audio-word-pt_br-banana-klaus-3.mp3'),
  'audio-word-pt_br-laranja-klaus-1.mp3': require('./audio/audio-word-pt_br-laranja-klaus-1.mp3'),
  'audio-word-pt_br-laranja-klaus-2.mp3': require('./audio/audio-word-pt_br-laranja-klaus-2.mp3'),
  'audio-word-pt_br-laranja-klaus-3.mp3': require('./audio/audio-word-pt_br-laranja-klaus-3.mp3'),
  'audio-word-pt_br-uvas-klaus-1.mp3': require('./audio/audio-word-pt_br-uvas-klaus-1.mp3'),
  'audio-word-pt_br-uvas-klaus-2.mp3': require('./audio/audio-word-pt_br-uvas-klaus-2.mp3'),
  'audio-word-pt_br-uvas-klaus-3.mp3': require('./audio/audio-word-pt_br-uvas-klaus-3.mp3'),
  'audio-word-pt_br-morango-klaus-1.mp3': require('./audio/audio-word-pt_br-morango-klaus-1.mp3'),
  'audio-word-pt_br-morango-klaus-2.mp3': require('./audio/audio-word-pt_br-morango-klaus-2.mp3'),
  'audio-word-pt_br-morango-klaus-3.mp3': require('./audio/audio-word-pt_br-morango-klaus-3.mp3'),
  
  // Sky
  'audio-word-pt_br-lua-klaus-1.mp3': require('./audio/audio-word-pt_br-lua-klaus-1.mp3'),
  'audio-word-pt_br-lua-klaus-2.mp3': require('./audio/audio-word-pt_br-lua-klaus-2.mp3'),
  'audio-word-pt_br-lua-klaus-3.mp3': require('./audio/audio-word-pt_br-lua-klaus-3.mp3'),
  
  // Furniture
  'audio-word-pt_br-sofa-klaus-1.mp3': require('./audio/audio-word-pt_br-sofa-klaus-1.mp3'),
  'audio-word-pt_br-sofa-klaus-2.mp3': require('./audio/audio-word-pt_br-sofa-klaus-2.mp3'),
  'audio-word-pt_br-sofa-klaus-3.mp3': require('./audio/audio-word-pt_br-sofa-klaus-3.mp3'),
  'audio-word-pt_br-cama-klaus-1.mp3': require('./audio/audio-word-pt_br-cama-klaus-1.mp3'),
  'audio-word-pt_br-cama-klaus-2.mp3': require('./audio/audio-word-pt_br-cama-klaus-2.mp3'),
  'audio-word-pt_br-cama-klaus-3.mp3': require('./audio/audio-word-pt_br-cama-klaus-3.mp3'),
  'audio-word-pt_br-mesa-klaus-1.mp3': require('./audio/audio-word-pt_br-mesa-klaus-1.mp3'),
  'audio-word-pt_br-mesa-klaus-2.mp3': require('./audio/audio-word-pt_br-mesa-klaus-2.mp3'),
  'audio-word-pt_br-mesa-klaus-3.mp3': require('./audio/audio-word-pt_br-mesa-klaus-3.mp3'),
  
  // Food
  'audio-word-pt_br-batata-klaus-1.mp3': require('./audio/audio-word-pt_br-batata-klaus-1.mp3'),
  'audio-word-pt_br-batata-klaus-2.mp3': require('./audio/audio-word-pt_br-batata-klaus-2.mp3'),
  'audio-word-pt_br-batata-klaus-3.mp3': require('./audio/audio-word-pt_br-batata-klaus-3.mp3'),
  
  // Kitchen
  'audio-word-pt_br-prato-klaus-1.mp3': require('./audio/audio-word-pt_br-prato-klaus-1.mp3'),
  'audio-word-pt_br-prato-klaus-2.mp3': require('./audio/audio-word-pt_br-prato-klaus-2.mp3'),
  'audio-word-pt_br-prato-klaus-3.mp3': require('./audio/audio-word-pt_br-prato-klaus-3.mp3'),
  
  // Utensils
  'audio-word-pt_br-garfo-klaus-1.mp3': require('./audio/audio-word-pt_br-garfo-klaus-1.mp3'),
  'audio-word-pt_br-garfo-klaus-2.mp3': require('./audio/audio-word-pt_br-garfo-klaus-2.mp3'),
  'audio-word-pt_br-garfo-klaus-3.mp3': require('./audio/audio-word-pt_br-garfo-klaus-3.mp3'),
  'audio-word-pt_br-colher-klaus-1.mp3': require('./audio/audio-word-pt_br-colher-klaus-1.mp3'),
  'audio-word-pt_br-colher-klaus-2.mp3': require('./audio/audio-word-pt_br-colher-klaus-2.mp3'),
  'audio-word-pt_br-colher-klaus-3.mp3': require('./audio/audio-word-pt_br-colher-klaus-3.mp3'),
  
  // Instruments
  'audio-word-pt_br-violao-klaus-1.mp3': require('./audio/audio-word-pt_br-violao-klaus-1.mp3'),
  'audio-word-pt_br-violao-klaus-2.mp3': require('./audio/audio-word-pt_br-violao-klaus-2.mp3'),
  'audio-word-pt_br-violao-klaus-3.mp3': require('./audio/audio-word-pt_br-violao-klaus-3.mp3'),
  'audio-word-pt_br-piano-klaus-1.mp3': require('./audio/audio-word-pt_br-piano-klaus-1.mp3'),
  'audio-word-pt_br-piano-klaus-2.mp3': require('./audio/audio-word-pt_br-piano-klaus-2.mp3'),
  'audio-word-pt_br-piano-klaus-3.mp3': require('./audio/audio-word-pt_br-piano-klaus-3.mp3'),
  'audio-word-pt_br-violino-klaus-1.mp3': require('./audio/audio-word-pt_br-violino-klaus-1.mp3'),
  'audio-word-pt_br-violino-klaus-2.mp3': require('./audio/audio-word-pt_br-violino-klaus-2.mp3'),
  'audio-word-pt_br-violino-klaus-3.mp3': require('./audio/audio-word-pt_br-violino-klaus-3.mp3'),
  'audio-word-pt_br-bateria-klaus-1.mp3': require('./audio/audio-word-pt_br-bateria-klaus-1.mp3'),
  'audio-word-pt_br-bateria-klaus-2.mp3': require('./audio/audio-word-pt_br-bateria-klaus-2.mp3'),
  'audio-word-pt_br-bateria-klaus-3.mp3': require('./audio/audio-word-pt_br-bateria-klaus-3.mp3'),
  'audio-word-pt_br-saxofone-klaus-1.mp3': require('./audio/audio-word-pt_br-saxofone-klaus-1.mp3'),
  'audio-word-pt_br-saxofone-klaus-2.mp3': require('./audio/audio-word-pt_br-saxofone-klaus-2.mp3'),
  'audio-word-pt_br-saxofone-klaus-3.mp3': require('./audio/audio-word-pt_br-saxofone-klaus-3.mp3'),
};

// Combine all audio maps
const audioMap = {
  ...testAudio,
  ...syllableAudio,
  ...wordAudio
};

export { audioMap, testAudio, syllableAudio, wordAudio }; 