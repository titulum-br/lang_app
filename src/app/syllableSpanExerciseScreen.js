import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as Speech from 'expo-speech';
import ConfettiCannon from 'react-native-confetti-cannon';

// Para exibir um timer em forma de círculo, podemos usar a biblioteca react-native-circular-progress
// Instale antes: npm install react-native-circular-progress
// ou yarn add react-native-circular-progress

import { AnimatedCircularProgress } from 'react-native-circular-progress';

/**
 * Modificações:
 * - Retiramos o texto "Tempo restante: Xs"
 * - Inserimos um círculo de progresso com AnimatedCircularProgress ao lado do score.
 *   Ele se preenche de 0% até 100% ao longo de 4 minutos (240s), no sentido horário.
 * - Quando o tempo chega a zero, exibe a tela final.
 */

export default function SyllableSpanExerciseScreen() {
  const TOTAL_TIME = 240; // 4 minutos

  // ============= ESTADOS PRINCIPAIS =============
  const [sequence, setSequence] = useState([]);          // Sequência de sílabas a memorizar
  const [displaySequence, setDisplaySequence] = useState(true);
  const [userInput, setUserInput] = useState([]);        // Sequência que o usuário clicou
  const [feedback, setFeedback] = useState('');

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [acertosNoNivel, setAcertosNoNivel] = useState(0);
  const [errosNoNivel, setErrosNoNivel] = useState(0);
  const [tentativasRestantes, setTentativasRestantes] = useState(3);

  // Se true, o usuário não pode mais apertar "Verificar"
  const [checkDisabled, setCheckDisabled] = useState(false);

  // Quando mostra "Próxima Rodada"
  const [showNextButton, setShowNextButton] = useState(false);

  // Tempo de jogo
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  // Se true, acabou o tempo / fim do jogo
  const [gameOver, setGameOver] = useState(false);

  // References para timeouts e intervals
  const confettiRef = useRef(null);
  const hideSequenceTimeout = useRef(null);
  const timerInterval = useRef(null);

  // Define a lista de consoantes possíveis
  const POSSIBLE_CONSONANTS = [
    'p', 't', 'l', 'm', 'r', 's', 'v', 'n', 'f', 'g', 'b', 'd', 'tr', 'dr'
  ];

  // Define as vogais para montar sílabas
  const VOWELS = ['a', 'e', 'i', 'o', 'u'];

  // Armazenamos as 15 sílabas do teclado atual
  const [currentSyllables, setCurrentSyllables] = useState([]);
  const [chosenConsonants, setChosenConsonants] = useState([]);

  // ===========================
  // FUNÇÕES AUXILIARES
  // ===========================

  function getAttemptsIndicator(num) {
    // Ex.: num=3 => "● ● ●".
    const arr = Array(num).fill('●');
    return arr.join(' ');
  }

  function pickRandomConsonants() {
    // Embaralha e pega as 3 primeiras
    const shuffled = [...POSSIBLE_CONSONANTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  function buildSyllableGrid(consonants) {
    // Monta 15 sílabas (5 vogais x 3 consoantes)
    const grid = [];
    for (let i = 0; i < VOWELS.length; i++) {
      for (let j = 0; j < consonants.length; j++) {
        const syll = consonants[j] + VOWELS[i];
        grid.push(syll);
      }
    }
    return grid;
  }

  function speakSequence(seq) {
    seq.forEach((syllable, index) => {
      setTimeout(() => {
        Speech.speak(syllable, {
          language: 'pt-BR',
          rate: 1.0
        });
      }, 800 * index);
    });
  }

  function getSequenceLength() {
    const isBonus = Math.random() < 0.2 && level > 1;
    return isBonus ? level - 1 : level;
  }

  // Gera a sequência de forma mais uniforme
  function generateSequenceUniform(cons, length) {
    const seq = [];
    for (let i = 0; i < length; i++) {
      const c = cons[Math.floor(Math.random() * cons.length)];
      const v = VOWELS[Math.floor(Math.random() * VOWELS.length)];
      seq.push(c + v);
    }
    return seq;
  }

  function isUserInputCorrect(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  function startNewRound() {
    if (gameOver) return; // Se já acabou o jogo, não inicia nada

    setDisplaySequence(true);
    setUserInput([]);
    setFeedback('');
    setShowNextButton(false);
    setTentativasRestantes(3);
    setCheckDisabled(false);

    if (hideSequenceTimeout.current) {
      clearTimeout(hideSequenceTimeout.current);
    }

    const cons = pickRandomConsonants();
    setChosenConsonants(cons);
    const newSyllables = buildSyllableGrid(cons);
    setCurrentSyllables(newSyllables);

    const length = getSequenceLength();
    const seq = generateSequenceUniform(cons, length);
    setSequence(seq);

    const displayTime = Math.max(2000, seq.length * 1000);
    hideSequenceTimeout.current = setTimeout(() => {
      setDisplaySequence(false);
    }, displayTime);

    speakSequence(seq);
  }

  function checkAnswer() {
    if (checkDisabled || gameOver) return;

    if (isUserInputCorrect(userInput, sequence)) {
      setFeedback('Correto!');
      if (confettiRef.current) {
        confettiRef.current.start();
      }
      setCheckDisabled(true);

      setScore((prev) => prev + Math.pow(2, level));
      setAcertosNoNivel((prev) => prev + 1);

      if (acertosNoNivel + 1 >= 3) {
        setFeedback(`Parabéns! Você concluiu o nível ${level}. Indo para o próximo...`);
        setLevel((prev) => prev + 1);
        setAcertosNoNivel(0);
        setErrosNoNivel(0);
      } else {
        setShowNextButton(true);
      }
    } else {
      // ERROU
      setFeedback('Incorreto.');
      setUserInput([]);

      const newTries = tentativasRestantes - 1;
      setTentativasRestantes(newTries);

      if (newTries <= 0) {
        // Esgotou tentativas
        const newErros = errosNoNivel + 1;
        setErrosNoNivel(newErros);
        setCheckDisabled(true);

        if (newErros >= 2) {
          setLevel((prev) => (prev > 1 ? prev - 1 : 1));
          setAcertosNoNivel(0);
          setErrosNoNivel(0);
          setFeedback('Falhou 2 vezes neste nível: nível reduzido.');
        } else {
          setFeedback('Você usou todas as tentativas desta rodada.');
        }
        setShowNextButton(true);
      }
    }
  }

  function handleSyllablePress(syllable) {
    if (displaySequence || checkDisabled || gameOver) return;
    setUserInput((prev) => [...prev, syllable]);
  }

  function handleNextRound() {
    startNewRound();
  }

  // RELOJINHO - substituímos por um círculo
  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval.current);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameOver) {
      if (hideSequenceTimeout.current) {
        clearTimeout(hideSequenceTimeout.current);
      }
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    }
  }, [gameOver]);

  // Inicia nova rodada sempre que o nível mudar (e não acabou o jogo)
  useEffect(() => {
    if (!gameOver) {
      startNewRound();
    }
    return () => {
      if (hideSequenceTimeout.current) {
        clearTimeout(hideSequenceTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  function renderSyllableGrid() {
    if (currentSyllables.length < 15) {
      return <Text style={{ textAlign: 'center' }}>Carregando teclado...</Text>;
    }

    const rows = [];
    for (let i = 0; i < 5; i++) {
      const rowItems = currentSyllables.slice(i * 3, i * 3 + 3);
      rows.push(
        <View style={styles.keypadRow} key={i}>
          {rowItems.map((syll, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.syllableButton}
              onPress={() => handleSyllablePress(syll)}
            >
              <Text style={styles.syllableButtonText}>{syll}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.keypadContainer}>
        {rows}
        <View style={styles.keypadRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              if (!displaySequence && !checkDisabled && !gameOver) {
                setUserInput((prev) => prev.slice(0, -1));
              }
            }}
          >
            <Text style={styles.actionButtonText}>⌫</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              if (!displaySequence && !checkDisabled && !gameOver) {
                setUserInput([]);
              }
            }}
          >
            <Text style={styles.actionButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Porcentagem preenchida do círculo: 0% no início, 100% no final.
  // Ex.: se timeLeft = 240 => fill=0, se timeLeft=0 => fill=100.
  // Então fill = ( (TOTAL_TIME - timeLeft) / TOTAL_TIME ) * 100.
  const circleFill = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;

  const verifyBtnLabel = `Verificar (${getAttemptsIndicator(tentativasRestantes)})`;

  if (gameOver) {
    return (
      <View style={styles.containerEnd}>
        <ConfettiCannon
          count={100}
          origin={{ x: 200, y: 0 }}
          autoStart={true}
          fadeOut={true}
        />
        <Text style={styles.endGameTitle}>TEMPO ESGOTADO!</Text>
        <Text style={styles.endGameScore}>Você fez {score} pontos!</Text>
        <Text style={styles.endGameMessage}>Parabéns pelo esforço! Volte amanhã para treinar mais!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ConfettiCannon
        count={50}
        origin={{ x: 200, y: 0 }}
        autoStart={false}
        fadeOut={true}
        ref={confettiRef}
      />

      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.levelText}>Nível {level}</Text>
        {/* Timer circular + Score lado a lado */}
        <View style={styles.timerScoreContainer}>
          <AnimatedCircularProgress
            size={48}
            width={6}
            fill={circleFill}
            tintColor="#FF5722"  
            backgroundColor="#CCC"
            rotation={0}
            style={{ marginRight: 16 }}
          />

          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      {displaySequence ? (
        <View style={styles.sequenceContainer}>
          <Text style={styles.sequenceText}>{sequence.join(' ')}</Text>
          <Text style={styles.subtitle}>(Memorize as sílabas)</Text>
        </View>
      ) : (
        <View style={styles.inputSection}>
          <View style={styles.userInputContainer}>
            <Text style={styles.userInputText}>
              {userInput.join(' ')}
            </Text>
          </View>

          {renderSyllableGrid()}

          {!showNextButton && (
            <TouchableOpacity
              style={[styles.checkButton, checkDisabled && { backgroundColor: '#888' }]}
              onPress={checkAnswer}
              disabled={checkDisabled}
            >
              <Text style={styles.checkButtonText}>
                {verifyBtnLabel}
              </Text>
            </TouchableOpacity>
          )}

          {feedback !== '' && (
            <Text style={styles.feedback}>{feedback}</Text>
          )}

          {showNextButton && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextRound}>
              <Text style={styles.nextButtonText}>Próxima Rodada</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerEnd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
  },
  endGameTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  endGameScore: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  endGameMessage: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
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
  timerScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerTextInside: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  levelText: {
    fontSize: 18,
    color: '#333',
  },
  scoreText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  sequenceContainer: {
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 10,
  },
  sequenceText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 20,
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
    textTransform: 'uppercase',
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
    fontSize: 16,
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
    fontSize: 20,
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
});