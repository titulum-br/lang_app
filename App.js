import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SpeechExerciseScreen from './screens/SpeechExerciseScreen';
import FlashcardGameScreen from './screens/FlashcardGameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
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
          name="FlashcardGame" 
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