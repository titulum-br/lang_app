# Ling App

A React Native app designed for aid speech therapy and language development, featuring interactive exercises for Portuguese language learning.

## Features

- **Memory Training Exercises**
  - Digit Span Exercise: Practice working memory with number sequences
  - Syllable Span Exercise: Enhance phonological memory with syllable sequences
  - Progressive difficulty levels
  - Audio feedback and visual rewards

- **Flashcard System**
  - Word recognition exercises
  - Audio pronunciation support
  - Multiple categories of words
  - Progressive hint system
  - Interactive matching game

- **Speech Exercises**
  - Name Game (Jogo de Nomes)
  - Word Cards (Cartões de Palavras)
  - Audio pronunciation support
  - Visual feedback

## Project Structure

```
ling_app/
├── assets/
│   ├── audio/          # Audio files for pronunciation
│   ├── images/         # Image assets
│   ├── audioImports.js # Audio file imports (auto-generated)
│   └── imageImports.js # Image file imports (auto-generated)
├── src/
│   ├── app/           # Main app screens
│   ├── styles/        # Style definitions
│   └── utils/         # Utility functions
├── scripts/           # Asset management scripts
└── App.js            # Main app component
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add audio files to `assets/audio/` directory
4. Start the development server:
   ```bash
   npx expo start
   ```

## Audio Assets

The app uses audio files for pronunciation. These files should be placed in the `assets/audio/` directory with the following naming convention:

- Syllable audio: `audio-syllable-pt_br-{item}-{syllable}-klaus-{number}.mp3`
- Word audio: `audio-word-pt_br-{item}-klaus-{number}.mp3`

Example:
- `audio-syllable-pt_br-cachorro-ca-klaus-1.mp3`
- `audio-word-pt_br-cachorro-klaus-1.mp3`

## Development

1. Audio files are not tracked in git to keep the repository size manageable
2. When adding new audio files:
   - Place them in `assets/audio/`
   - Run `npm run generate-imports` to update the import files
   - Test the audio playback in the app

## Building the Application

To build the application:

1. For development: `eas build -p android --profile development`
2. For testing: `eas build -p android --profile preview`
3. For production: `eas build -p android --profile production` 