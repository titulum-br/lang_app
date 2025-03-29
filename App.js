import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/app/home.js';
import SpeechExerciseScreen from './src/app/speechExercise.js';
import FlashcardScreen from './src/app/flashcardScreen.js';
import FlashcardGameScreen from './src/app/flashcardGameScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading (could be used for asset preloading in the future)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Ling App...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Exercícios de Afasia',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen 
          name="SpeechExercise" 
          component={SpeechExerciseScreen} 
          options={{ 
            title: 'Exercício de Fala',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen 
          name="NewFlashcards" 
          component={FlashcardScreen} 
          options={{ 
            title: 'Cartões de Palavras',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="FlashcardGameScreen"
          component={FlashcardGameScreen}
          options={{
            title: 'Jogo de Nomes',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 