/**
 * FlashcardGameScreen.js
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import utility modules
import styles from '../styles/FlashcardGameStyles';
import { generateFlashcards } from '../utils/flashcardUtils';
import { 
  initAudio, 
  playAudio, 
  createTestAudioFile,
  ensureAudioDirectoryExists
} from '../utils/audioUtils';
import { audioMap, testAudio } from '../assets/audioImports';

// Helper function to normalize accented characters
const normalizeAccents = (text) => {
  const accentMap = {
    'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e',
    'í': 'i', 'ì': 'i', 'î': 'i',
    'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o',
    'ú': 'u', 'ù': 'u', 'û': 'u',
    'ç': 'c'
  };
  
  return text.split('').map(char => accentMap[char] || char).join('');
};

const FlashcardGameScreen = () => {
  const navigation = useNavigation();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tipLevel, setTipLevel] = useState(0);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const MAX_ROUNDS = 10;
  const MAX_TIP_LEVEL = 4;

  // Initialize the Audio library
  useEffect(() => {
    initAudio();
    
    // Cleanup function to unload sound when component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  // Load flashcards on component mount
  useEffect(() => {
    loadFlashcards();
  }, []);

  const handlePlayAudio = async (type = 'tip') => {
    const currentFlashcard = flashcards[currentIndex];
    
    if (!currentFlashcard) return;
    
    // Stop any currently playing sound
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    
    console.log('Current flashcard:', JSON.stringify(currentFlashcard, null, 2));
    
    if (type === 'tip' && currentFlashcard.tip) {
      // We want to play a syllable audio
      const itemName = currentFlashcard.item;
      const syllable = currentFlashcard.tip.toLowerCase();
      
      console.log(`Looking for syllable audio: item=${itemName}, syllable=${syllable}`);
      
      // Get all keys from audioMap
      const audioKeys = Object.keys(audioMap);
      
      // First, try to find an exact match for this item and syllable
      let matchingKeys = audioKeys.filter(key => {
        return key.includes('syllable') && 
               key.includes(itemName) && 
               (key.includes(`-${syllable}-`) || key.includes(`-${normalizeAccents(syllable)}-`));
      });
      
      console.log(`Found ${matchingKeys.length} potential exact matches:`, matchingKeys);
      
      if (matchingKeys.length > 0) {
        // Use the first match
        console.log(`Playing exact match: ${matchingKeys[0]}`);
        await playAudio(audioMap[matchingKeys[0]], setSound, setIsPlayingAudio);
        return;
      }
      
      // If no exact match, try to find any syllable for this item
      matchingKeys = audioKeys.filter(key => {
        return key.includes('syllable') && key.includes(itemName);
      });
      
      console.log(`Found ${matchingKeys.length} syllable files for item ${itemName}:`, matchingKeys);
      
      if (matchingKeys.length > 0) {
        // Use the first match
        console.log(`Playing item syllable: ${matchingKeys[0]}`);
        await playAudio(audioMap[matchingKeys[0]], setSound, setIsPlayingAudio);
        return;
      }
      
      // If still no match, try to find any syllable audio file
      matchingKeys = audioKeys.filter(key => key.includes('syllable'));
      
      if (matchingKeys.length > 0) {
        // Use the first match
        console.log(`Playing any syllable: ${matchingKeys[0]}`);
        await playAudio(audioMap[matchingKeys[0]], setSound, setIsPlayingAudio);
        return;
      }
      
      // If all else fails, use the test audio
      console.log('No syllable audio found at all. Using test audio.');
      await playAudio(audioMap['direct-test-klaus.mp3'], setSound, setIsPlayingAudio);
      
    } else if (type === 'word') {
      // We want to play a word audio
      const itemName = currentFlashcard.item;
      
      // Get all keys from audioMap
      const audioKeys = Object.keys(audioMap);
      
      // Try to find any word audio for this item
      const matchingKeys = audioKeys.filter(key => {
        return key.includes('word') && key.includes(itemName);
      });
      
      console.log(`Found ${matchingKeys.length} word files for item ${itemName}:`, matchingKeys);
      
      if (matchingKeys.length > 0) {
        // Use the first match
        console.log(`Playing word audio: ${matchingKeys[0]}`);
        await playAudio(audioMap[matchingKeys[0]], setSound, setIsPlayingAudio);
        return;
      }
      
      // If no match, alert the user
      console.error(`No word audio found for item: ${itemName}`);
      Alert.alert('Audio Error', 'Could not play the audio file.');
    }
  };

  const handleNext = async () => {
    // Stop any currently playing sound
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    
    // Reset tip level
    setTipLevel(0);
    
    // Increment rounds played
    const newRoundsPlayed = roundsPlayed + 1;
    setRoundsPlayed(newRoundsPlayed);
    
    // Check if we've reached the max rounds
    if (newRoundsPlayed >= MAX_ROUNDS) {
      // Go directly back to home screen without showing completion screen
      navigation.goBack();
      return;
    }
    
    // Check if we've reached the end of the cards
    if (currentIndex >= flashcards.length - 1) {
      // Reset to beginning of flashcard deck
      setCurrentIndex(0);
      // Shuffle cards for more variety
      const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
      setFlashcards(shuffled);
    } else {
      // Move to next card
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleTip = async () => {
    // Stop any currently playing sound
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    
    // Advance the tip level, but only if not already at max
    if (tipLevel < MAX_TIP_LEVEL) {
      const newTipLevel = tipLevel + 1;
      setTipLevel(newTipLevel);
      
      // Play audio automatically for tip levels 2 and 4
      if (newTipLevel === 2) {
        // Play syllable audio at tip level 2
        setTimeout(() => handlePlayAudio('tip'), 100);
      } else if (newTipLevel === 4) {
        // Play word audio at tip level 4
        setTimeout(() => handlePlayAudio('word'), 100);
      }
    }
  };

  const getCurrentTip = () => {
    const currentFlashcard = flashcards[currentIndex];
    if (!currentFlashcard) return '';
    
    switch(tipLevel) {
      case 0:
        return ""; // No tip initially
      case 1: // First tip - show syllable text
        return currentFlashcard.tip.toLowerCase();
      case 2: // Second tip - after playing syllable sound
        return currentFlashcard.tip.toLowerCase();
      case 3: // Third tip - show word
        return currentFlashcard.name;
      case 4: // Fourth tip - after playing word sound
        return currentFlashcard.name;
      default:
        return "";
    }
  };

  const loadFlashcards = async () => {
    setLoading(true);
    
    try {
      // Make sure audio directory and test file exist
      await createTestAudioFile();
      
      // Generate flashcards
      const cards = generateFlashcards();
      setFlashcards(cards);
      setCurrentIndex(0);
      setTipLevel(0);
      setRoundsPlayed(0);
      setGameComplete(false);
    } catch (error) {
      console.error('Error loading flashcards:', error);
      setError('Failed to load flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando imagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => {
            setLoading(true);
            setError(null);
            loadFlashcards();
          }}
        >
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (flashcards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Nenhuma imagem encontrada</Text>
      </View>
    );
  }

  if (gameComplete) {
    return (
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <Text style={styles.tipText}>Parabéns! Você completou 10 rodadas.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                setCurrentIndex(0);
                setTipLevel(0);
                setRoundsPlayed(0);
                setGameComplete(false);
                const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
                setFlashcards(shuffled);
              }}
            >
              <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.roundIndicator}>
        <Text style={styles.roundText}>Rodada {roundsPlayed + 1}/{MAX_ROUNDS}</Text>
      </View>
      <View style={styles.gameContainer}>
        <View style={styles.card}>
          <Image 
            source={flashcards[currentIndex].image} 
            style={styles.cardImage} 
            resizeMode="contain"
          />
          
          <View style={styles.audioControls}>
            {tipLevel >= 2 && (
              <TouchableOpacity 
                style={[styles.audioButton, isPlayingAudio && styles.disabledButton]} 
                onPress={() => handlePlayAudio('tip')}
                disabled={isPlayingAudio}
              >
                <Ionicons name="volume-medium-outline" size={24} color="white" />
                <Text style={styles.audioButtonText}>Sílaba</Text>
              </TouchableOpacity>
            )}
            
            {tipLevel >= 4 && (
              <TouchableOpacity 
                style={[styles.audioButton, isPlayingAudio && styles.disabledButton]} 
                onPress={() => handlePlayAudio('word')}
                disabled={isPlayingAudio}
              >
                <Ionicons name="volume-high-outline" size={24} color="white" />
                <Text style={styles.audioButtonText}>Palavra</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.tipContainer}>
            {tipLevel > 0 && (
              <Text style={styles.tipText}>
                {getCurrentTip()}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, tipLevel >= MAX_TIP_LEVEL && styles.disabledButton]} 
            onPress={handleTip}
            disabled={tipLevel >= MAX_TIP_LEVEL}
          >
            <Text style={styles.buttonText}>Dica</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlashcardGameScreen; 