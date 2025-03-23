# Ling App

A React Native educational app for learning Portuguese through flashcards and audio.

## Features

- Flashcard-based learning system
- Audio pronunciation support
- Multiple categories of words
- Progressive hint system
- 10-round game mode

## Project Structure

```
ling_app/
├── assets/
│   ├── audio/          # Audio files (not tracked in git)
│   ├── images/         # Image assets
│   ├── audioImports.js # Audio file imports
│   └── imageImports.js # Image file imports
├── screens/            # App screens
├── styles/            # Style definitions
├── utils/             # Utility functions
└── App.js             # Main app component
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
   - Update `audioImports.js` with the new file references
   - Test the audio playback in the app

## License

Proprietary and Confidential
Unauthorized copying of this file, via any medium is strictly prohibited.
All rights reserved. 