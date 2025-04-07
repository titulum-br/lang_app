/**
 * repetitionSpanStyles.js
 * 
 * Styles for the Repetition Span Memory Exercise
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#EEE',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  levelText: {
    fontSize: 18,
    color: '#333',
  },
  scoreText: {
    fontSize: 18,
    color: '#333',
  },
  sequenceContainer: {
    alignItems: 'center',
    marginVertical: 40,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sequenceText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  inputSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  userInputContainer: {
    minHeight: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  userInputText: {
    fontSize: 24,
    color: '#333',
  },
  keypadContainer: {
    width: '80%',
    marginBottom: 20,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  digitButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  digitButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  syllableButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  syllableButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  checkButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  feedback: {
    fontSize: 20,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  // New styles for the updated game
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  attemptsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  correctText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  incorrectText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  clearButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  tryAgainButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles; 