# Ling App Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Architecture](#architecture)
3. [Navigation Flow](#navigation-flow)
4. [Asset Management System](#asset-management-system)
5. [Flashcard System](#flashcard-system)
6. [Screens](#screens)
7. [Utilities](#utilities)
8. [Scripts](#scripts)

## Application Overview

Ling App is a language learning application designed for speech therapy and language development. It provides various exercises to help users practice word recognition, pronunciation, and language comprehension through interactive activities.

## Architecture

The application is built using React Native and Expo, with a focus on modularity and extensibility. The architecture follows these principles:

- **Component-Based**: UI elements are broken down into reusable components
- **Asset Automation**: Media assets (audio, images) are managed through automated scripts
- **Simplified Configuration**: Flashcard data is structured for easy management by non-developers

## Navigation Flow

The navigation is structured as follows:

1. **HomeScreen**: Entry point with access to main exercise categories
2. **SpeechExerciseScreen**: Hub for all speech-related exercises
   - Jogo de Nomes (Name Game): First exercise
   - Cartões de Palavras (Word Cards): Second exercise
3. **FlashcardGameScreen**: Interactive flashcard matching game
4. **FlashcardScreen**: Simple word cards with audio pronunciation

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

## Flashcard System

### Data Structure

The flashcard system uses a simplified data structure:

```json
{
  "category": {
    "item": {
      "name": "Display Name",
      "tip": "Syllable Hint",
      "audioSyllable": "audio-syllable-language-item-syllable",
      "audioWord": "audio-word-language-item",
      "images": "objeto-category-item"
    }
  }
}
```

At runtime, the app processes this data and matches it with available assets:

1. `audioSyllable` is expanded to match all available syllable audio files
2. `audioWord` is expanded to match all available word audio files
3. `images` is expanded to match all available images for that item

### Processing Flow

1. The app reads `flashcards.json` at startup
2. The `processFlashcards()` function expands the patterns into actual file references
3. When displaying a flashcard, the app randomly selects from available assets
4. When playing audio, the app randomly selects from available audio files

## Screens

### HomeScreen
- **Purpose**: Main entry point for the application
- **Features**: Navigation to exercise categories
- **Location**: `screens/HomeScreen.js`

### SpeechExerciseScreen
- **Purpose**: Hub for speech-related exercises
- **Features**: Grid of exercise options
- **Location**: `screens/SpeechExerciseScreen.js`

### FlashcardGameScreen
- **Purpose**: Interactive flashcard matching game
- **Features**: Image-word matching, audio playback
- **Location**: `screens/FlashcardGameScreen.js`

### FlashcardScreen
- **Purpose**: Simple word cards with audio pronunciation
- **Features**: Category selection, syllable/word audio playback, image display
- **Location**: `app/screens/FlashcardScreen.js`

## Utilities

### flashcardProcessor.js
- **Purpose**: Processes flashcard data and matches with available assets
- **Location**: `app/utils/flashcardProcessor.js`
- **Key Functions**:
  - `processFlashcards(flashcards)`: Expands simplified flashcard data to match available assets
  - `findSyllableAudio(baseName)`: Finds matching syllable audio files
  - `findWordAudio(baseName)`: Finds matching word audio files
  - `findImages(basePattern)`: Finds matching image files
  - `getRandomAudio(audioFiles)`: Gets a random audio file from matching files
  - `getRandomImage(imageFiles)`: Gets a random image from matching files
  - `setLanguage(language)`: Sets the current language
  - `getLanguage()`: Gets the current language

## Scripts

### generateImports.js
- **Purpose**: Automatically generates import files for audio and images
- **Location**: `scripts/generateImports.js`
- **Functions**:
  - `generateAudioImports()`: Scans audio directory and generates `audioImports.js`
  - `generateImageImports()`: Scans images directory and generates `imageImports.js`
  - `main()`: Main execution function

The script generates two files:
- **audioImports.js**: Contains imports for all audio files, categorized by type
- **imageImports.js**: Contains imports for all image files, with grouping by prefix

### renameAudioFiles.js
- **Purpose**: Utility to rename audio files (e.g., remove accents)
- **Location**: `scripts/renameAudioFiles.js`
- **Functions**:
  - `removeAccents(str)`: Removes accents from a string
  - `renameAudioFiles()`: Renames audio files in the audio directory

## Integration with Expo Application Services (EAS)

The application is configured for building with EAS:

### eas.json
- **Purpose**: Configuration for EAS builds
- **Profiles**:
  - `development`: For development builds (APK)
  - `preview`: For testing builds (APK)
  - `preview2`: Alternative testing build with assembleRelease
  - `production`: For production builds (AAB)

## Asset File Structure

```
assets/
├── audio/
│   ├── audio-syllable-pt_br-*.mp3
│   ├── audio-word-pt_br-*.mp3
│   └── ...
├── images/
│   ├── objeto-animal-*.png
│   ├── objeto-fruta-*.png
│   └── ...
├── audioImports.js (auto-generated)
├── imageImports.js (auto-generated)
└── flashcards.json
```

## Development Workflow

1. Artists add audio/image files following naming conventions
2. Run `npm run generate-imports` to update imports (automatic on app start)
3. Update `flashcards.json` to add new items if needed
4. The app automatically finds and uses all matching assets

## Building the Application

To build the application:

1. For development: `eas build -p android --profile development`
2. For testing: `eas build -p android --profile preview`
3. For production: `eas build -p android --profile production` 