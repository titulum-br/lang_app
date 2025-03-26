import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import flashcardData from '../../assets/flashcards.json';
import { processFlashcards, getRandomAudio, getRandomImage } from '../utils/flashcardProcessor';

const FlashcardScreen = () => {
  const [sound, setSound] = useState();
  const [currentCategory, setCurrentCategory] = useState('animals');
  const [currentItem, setCurrentItem] = useState(null);
  const [processedFlashcards, setProcessedFlashcards] = useState(null);
  const [loading, setLoading] = useState(true);

  // Process flashcards when component mounts
  useEffect(() => {
    const processed = processFlashcards(flashcardData);
    setProcessedFlashcards(processed);
    
    // Select random item from first category
    if (processed && processed[currentCategory]) {
      const keys = Object.keys(processed[currentCategory]);
      if (keys.length > 0) {
        setCurrentItem(processed[currentCategory][keys[0]]);
      }
    }
    
    setLoading(false);
  }, []);

  // Clean up any audio when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Play syllable audio for current item
  const playSyllableAudio = async () => {
    if (!currentItem || !currentItem.audioSyllable || currentItem.audioSyllable.length === 0) {
      return;
    }

    try {
      const audioAsset = getRandomAudio(currentItem.audioSyllable);
      if (!audioAsset) return;

      const { sound: newSound } = await Audio.Sound.createAsync(audioAsset);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing syllable audio:', error);
    }
  };

  // Play word audio for current item
  const playWordAudio = async () => {
    if (!currentItem || !currentItem.audioWord || currentItem.audioWord.length === 0) {
      return;
    }

    try {
      const audioAsset = getRandomAudio(currentItem.audioWord);
      if (!audioAsset) return;

      const { sound: newSound } = await Audio.Sound.createAsync(audioAsset);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing word audio:', error);
    }
  };

  // Select next item from current category
  const goToNextItem = () => {
    if (!processedFlashcards || !currentCategory) return;
    
    const items = Object.keys(processedFlashcards[currentCategory]);
    const currentIndex = items.findIndex(key => 
      processedFlashcards[currentCategory][key].name === currentItem.name
    );
    
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentItem(processedFlashcards[currentCategory][items[nextIndex]]);
  };

  // Select previous item from current category
  const goToPreviousItem = () => {
    if (!processedFlashcards || !currentCategory) return;
    
    const items = Object.keys(processedFlashcards[currentCategory]);
    const currentIndex = items.findIndex(key => 
      processedFlashcards[currentCategory][key].name === currentItem.name
    );
    
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentItem(processedFlashcards[currentCategory][items[prevIndex]]);
  };

  // Change to a different category
  const changeCategory = (category) => {
    if (!processedFlashcards || !processedFlashcards[category]) return;
    
    setCurrentCategory(category);
    const keys = Object.keys(processedFlashcards[category]);
    if (keys.length > 0) {
      setCurrentItem(processedFlashcards[category][keys[0]]);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading flashcards...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Category selector */}
      <View style={styles.categorySelector}>
        {processedFlashcards && Object.keys(processedFlashcards).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              currentCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => changeCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                currentCategory === category && styles.activeCategoryButtonText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Flashcard content */}
      {currentItem && (
        <View style={styles.flashcardContainer}>
          <Text style={styles.itemName}>{currentItem.name}</Text>
          
          <View style={styles.imageContainer}>
            {currentItem.images && currentItem.images.length > 0 ? (
              <Image 
                source={getRandomImage(currentItem.images)} 
                style={styles.itemImage} 
                resizeMode="contain"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text>No image available</Text>
              </View>
            )}
          </View>
          
          <View style={styles.audioButtonsContainer}>
            <TouchableOpacity 
              style={styles.audioButton} 
              onPress={playSyllableAudio}
            >
              <Text style={styles.audioButtonText}>Play Syllable ({currentItem.tip})</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.audioButton} 
              onPress={playWordAudio}
            >
              <Text style={styles.audioButtonText}>Play Word</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={goToPreviousItem}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={goToNextItem}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  activeCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  activeCategoryButtonText: {
    color: 'white',
  },
  flashcardContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  audioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  audioButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  audioButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  navButton: {
    backgroundColor: '#333',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FlashcardScreen; 