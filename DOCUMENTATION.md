# Ling App Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Architecture](#architecture)
3. [Navigation Flow](#navigation-flow)
4. [Exercise Types](#exercise-types)
5. [Asset Management System](#asset-management-system)
6. [Screens](#screens)
7. [Utilities](#utilities)
8. [Scripts](#scripts)
9. [Building and Deployment](#building-and-deployment)

## Application Overview

Ling App is an application designed for aid in speech therapy and cognitive training. It provides various exercises to help users with:
- Working memory through digit sequences
- Phonological memory through syllable sequences
- Word recognition and pronunciation
- Language comprehension through interactive activities

## Architecture

The application is built using React Native and Expo, with a focus on modularity and extensibility. The architecture follows these principles:

- **Component-Based**: UI elements are broken down into reusable components
- **Asset Automation**: Media assets (audio, images) are managed through automated scripts
- **Progressive Difficulty**: Exercises adapt to user performance
- **Accessibility**: Built with accessibility features for speech therapy use

## Navigation Flow

The navigation is structured as follows:

1. **HomeScreen**: Entry point with access to main exercise categories
2. **SpeechExerciseScreen**: Hub for speech-related exercises
   - Jogo de Nomes (Name Game): Interactive word matching
   - Cartões de Palavras (Word Cards): Word recognition practice
3. **Memory Training Exercises**:
   - RepetitionSpanExercise: Digit sequence memory training
   - SyllableSpanExercise: Syllable sequence memory training
4. **FlashcardGameScreen**: Interactive flashcard matching game
5. **FlashcardScreen**: Simple word cards with audio pronunciation

## Exercise Types

### Memory Training Exercises

#### Digit Span Exercise
- Progressive difficulty levels
- Audio feedback for each digit
- Visual feedback with confetti on success
- Three attempts per round
- Level progression based on performance

#### Syllable Span Exercise
- 4-minute time limit
- Visual progress indicator
- Three consonant-based syllable grids
- Audio pronunciation support
- Progressive difficulty system

### Flashcard System

#### Word Cards
- Category-based organization
- Audio pronunciation support
- Progressive hint system
- Image-word association

#### Name Game
- Interactive matching interface
- Audio feedback
- Visual rewards
- Multiple difficulty levels

## Asset Management System

The application uses an automated system to manage media assets:

### Audio Files

Audio files follow this naming convention:
- **Word Audio**: `audio-word-{language}-{word}-{speaker}-{version}.mp3`
- **Syllable Audio**: `audio-syllable-{language}-{word}-{syllable}-{speaker}-{version}.mp3`

Example: `audio-syllable-pt_br-cachorro-ca-klaus-1.mp3`

### Image Files

Image files follow this naming convention:
- `objeto-{category}-{item}-{version}.png`

Example: `objeto-animal-cachorro-1.png`

## Screens

### HomeScreen
- **Purpose**: Main entry point for the application
- **Features**: Navigation to exercise categories
- **Location**: `src/app/home.js`

### SpeechExerciseScreen
- **Purpose**: Hub for speech-related exercises
- **Features**: Grid of exercise options
- **Location**: `src/app/speechExercise.js`

### RepetitionSpanExerciseScreen
- **Purpose**: Digit sequence memory training
- **Features**: 
  - Progressive difficulty
  - Audio feedback
  - Visual rewards
  - Performance tracking
- **Location**: `src/app/repetitionSpanGame.js`

### SyllableSpanExerciseScreen
- **Purpose**: Syllable sequence memory training
- **Features**:
  - Time-based challenge
  - Visual progress indicator
  - Dynamic syllable grids
  - Audio pronunciation
- **Location**: `src/app/syllableSpanExerciseScreen.js`

### FlashcardGameScreen
- **Purpose**: Interactive flashcard matching game
- **Features**: Image-word matching, audio playback
- **Location**: `src/app/flashcardGameScreen.js`

### FlashcardScreen
- **Purpose**: Simple word cards with audio pronunciation
- **Features**: Category selection, syllable/word audio playback, image display
- **Location**: `src/app/flashcardScreen.js`

## Utilities

### flashcardUtils.js
- **Purpose**: Processes flashcard data and matches with available assets
- **Location**: `src/utils/flashcardUtils.js`
- **Key Functions**:
  - `processFlashcards(flashcards)`: Expands simplified flashcard data
  - `findSyllableAudio(baseName)`: Finds matching syllable audio files
  - `findWordAudio(baseName)`: Finds matching word audio files
  - `findImages(basePattern)`: Finds matching image files

### audioUtils.js
- **Purpose**: Handles audio playback and management
- **Location**: `src/utils/audioUtils.js`
- **Key Functions**:
  - Audio file loading
  - Playback control
  - Error handling

## Scripts

### generateImports.js
- **Purpose**: Automatically generates import files for audio and images
- **Location**: `scripts/generateImports.js`
- **Functions**:
  - `generateAudioImports()`: Scans audio directory and generates `audioImports.js`
  - `generateImageImports()`: Scans images directory and generates `imageImports.js`

### renameAudioFiles.js
- **Purpose**: Utility to rename audio files (e.g., remove accents)
- **Location**: `scripts/renameAudioFiles.js`
- **Functions**:
  - `removeAccents(str)`: Removes accents from a string
  - `renameAudioFiles()`: Renames audio files in the audio directory

## Building and Deployment

The application is configured for building with EAS:

### eas.json
- **Purpose**: Configuration for EAS builds
- **Profiles**:
  - `development`: For development builds (APK)
  - `preview`: For testing builds (APK)
  - `preview2`: Alternative testing build with assembleRelease
  - `production`: For production builds (AAB)

### Build Commands
1. Development: `eas build -p android --profile development`
2. Testing: `eas build -p android --profile preview`
3. Production: `eas build -p android --profile production`

## Development Workflow

1. Artists add audio/image files following naming conventions
2. Run `npm run generate-imports` to update imports (automatic on app start)
3. Update exercise data if needed
4. Test the application
5. Build and deploy using EAS 