/**
 * flashcardUtils.js
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * All rights reserved.
 */

import { imageMap } from '../assets/imageImports';
import flashcardsData from '../assets/images/flashcards.json';

// Function to get random item from array
export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Function to get random category and item
export const getRandomFlashcard = () => {
  // First, get all categories
  const categories = Object.keys(flashcardsData);
  
  // Randomly select a category
  const randomCategory = getRandomItem(categories);
  
  // Get all items in this category
  const items = Object.keys(flashcardsData[randomCategory]);
  
  // Randomly select an item from this category
  const randomItem = getRandomItem(items);
  const itemData = flashcardsData[randomCategory][randomItem];
  
  // Filter available images for this item
  const availableImages = itemData.images ? 
    itemData.images.filter(img => imageMap[img]) : 
    (itemData.image && imageMap[itemData.image] ? [itemData.image] : []);
  
  if (availableImages.length === 0) {
    // If no images available for this item, try another one
    return getRandomFlashcard();
  }
  
  // Randomly select an image for this item
  const randomImage = getRandomItem(availableImages);
  
  return {
    image: imageMap[randomImage],
    word: itemData.name,
    tip: itemData.tip,
    tip2: itemData.tip2 || '',
    fullName: itemData.name,
    category: randomCategory,
    item: randomItem
  };
};

// Function to generate flashcards from the data
export const generateFlashcards = () => {
  const cards = [];
  
  // Iterate through all categories
  Object.keys(flashcardsData).forEach(category => {
    // Iterate through items in the category
    Object.entries(flashcardsData[category]).forEach(([key, item]) => {
      // Get image (either from images array or single image property)
      let image = null;
      if (item.images && item.images.length > 0) {
        // Find first available image in the images array
        for (const img of item.images) {
          if (imageMap[img]) {
            image = imageMap[img];
            break;
          }
        }
      } else if (item.image && imageMap[item.image]) {
        image = imageMap[item.image];
      }
      
      // Skip items without an image
      if (!image) return;
      
      // Create a flashcard with the correct properties
      const card = {
        id: key,
        category,
        name: item.name || key,
        tip: item.tip || '',
        tip2: item.tip2 || '',
        image: image,
        item: key
      };
      
      cards.push(card);
    });
  });
  
  console.log(`Generated ${cards.length} flashcards`);
  
  // Shuffle the cards for a random order
  return shuffleArray(cards);
};

// Function to shuffle array (Fisher-Yates algorithm)
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}; 