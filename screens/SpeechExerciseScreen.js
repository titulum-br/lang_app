import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function SpeechExerciseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.button, styles.activeButton]}
          onPress={() => navigation.navigate('FlashcardGame')}
        >
          <Text style={styles.buttonText}>Jogo de Nomes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.activeButton]}
          onPress={() => navigation.navigate('NewFlashcards')}
        >
          <Text style={styles.buttonText}>Cartões de Palavras</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.disabledButton]}>
          <Text style={styles.buttonText}>Exercício 3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.disabledButton]}>
          <Text style={styles.buttonText}>Exercício 4</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  activeButton: {
    backgroundColor: '#f4511e',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 