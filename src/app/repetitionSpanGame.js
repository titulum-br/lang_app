import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// TTS (caso use Expo):
import * as Speech from 'expo-speech';

// Confetti Cannon
import ConfettiCannon from 'react-native-confetti-cannon';

// Import styles
import styles from '../styles/repetitionSpanStyles.js';

export default function RepetitionSpanExerciseScreen() {
  // ESTADOS PRINCIPAIS
  const [sequence, setSequence] = useState([]);           // sequência atual de dígitos
  const [displaySequence, setDisplaySequence] = useState(true);
  const [userInput, setUserInput] = useState([]);
  const [feedback, setFeedback] = useState('');

  // Informações de jogo
  const [level, setLevel] = useState(1);                  // nível inicia em 1 (um dígito)
  const [score, setScore] = useState(0);
  const [acertosNoNivel, setAcertosNoNivel] = useState(0);
  const [errosNoNivel, setErrosNoNivel] = useState(0);

  // Tentativas nesta rodada (até 3)
  const [tentativasRestantes, setTentativasRestantes] = useState(3);

  // Controla exibição de botões e confete
  const [showNextButton, setShowNextButton] = useState(false);

  // Para disparar confete quando acerta
  const confettiRef = useRef(null);

  // Timeout para esconder a sequência
  const hideSequenceTimeout = useRef(null);

  // ==============================
  // FUNÇÕES AUXILIARES
  // ==============================

  function speakSequence(seq) {
    // Fala cada dígito com pequena pausa
    seq.forEach((digit, index) => {
      setTimeout(() => {
        Speech.speak(String(digit), {
          language: 'pt-BR',
          rate: 1.0
        });
      }, 700 * index);
    });
  }

  function generateSequence() {
    // 20% de chance de bônus (1 dígito a menos)
    const isBonus = Math.random() < 0.2 && level > 1;
    const length = isBonus ? level - 1 : level;

    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * 10));
    }
    return newSequence;
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

  // Inicia ou reseta o estado para uma nova rodada
  function startNewRound() {
    const seq = generateSequence();
    setSequence(seq);
    setDisplaySequence(true);
    setUserInput([]);
    setFeedback('');
    setShowNextButton(false);
    setTentativasRestantes(3);

    if (hideSequenceTimeout.current) {
      clearTimeout(hideSequenceTimeout.current);
    }
    // Ex: no mínimo 2s, ou 1s por dígito
    const displayTime = Math.max(4000, seq.length * 1000);

    hideSequenceTimeout.current = setTimeout(() => {
      setDisplaySequence(false);
    }, displayTime);

    speakSequence(seq);
  }

  // Verifica se o input do usuário corresponde à sequência
  function checkAnswer() {
    if (isUserInputCorrect(userInput, sequence)) {
      // ACERTOU
      setFeedback('Correto!');

      if (confettiRef.current) {
        confettiRef.current.start();
      }

      // Pontuação e contadores
      setScore((prev) => prev + Math.pow(2, level));
      setAcertosNoNivel((prev) => prev + 1);

      // 3 acertos para subir de nível
      if (acertosNoNivel + 1 >= 3) {
        setFeedback(`Você concluiu o nível ${level}! Subindo de nível...`);
        setAcertosNoNivel(0);
        setErrosNoNivel(0);
        setLevel((prev) => prev + 1);
      } else {
        // Fica no mesmo nível, próxima rodada
        setShowNextButton(true);
      }

    } else {
      // ERROU
      setFeedback('Incorreto.');
      // Limpa o input para poder tentar de novo
      setUserInput([]);

      setTentativasRestantes((prev) => prev - 1);

      if (tentativasRestantes - 1 <= 0) {
        // Esgotou as tentativas
        const newErros = errosNoNivel + 1;
        setErrosNoNivel(newErros);
        if (newErros >= 2) {
          setLevel((prev) => (prev > 1 ? prev - 1 : 1));
          setAcertosNoNivel(0);
          setErrosNoNivel(0);
          setFeedback('Você falhou 2 vezes: o nível diminuiu.');
        } else {
          setFeedback('Você usou todas as tentativas desta rodada.');
        }
        setShowNextButton(true);
      }
    }
  }

  useEffect(() => {
    startNewRound();
    return () => {
      if (hideSequenceTimeout.current) {
        clearTimeout(hideSequenceTimeout.current);
      }
    };
  }, [level]);

  function handleDigitPress(digit) {
    if (displaySequence) return;
    setUserInput((prev) => [...prev, digit]);
  }

  function handleNextRound() {
    startNewRound();
  }

  const renderKeypad = () => {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return (
      <View style={styles.keypadContainer}>
        <View style={styles.keypadRow}>
          {digits.slice(0, 3).map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.digitButton}
              onPress={() => handleDigitPress(digit)}
              accessible={true}
              accessibilityLabel={`Dígito ${digit}`}
            >
              <Text style={[styles.digitButtonText, { fontSize: 32 }]}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadRow}>
          {digits.slice(3, 6).map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.digitButton}
              onPress={() => handleDigitPress(digit)}
              accessible={true}
              accessibilityLabel={`Dígito ${digit}`}
            >
              <Text style={[styles.digitButtonText, { fontSize: 32 }]}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadRow}>
          {digits.slice(6, 9).map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.digitButton}
              onPress={() => handleDigitPress(digit)}
              accessible={true}
              accessibilityLabel={`Dígito ${digit}`}
            >
              <Text style={[styles.digitButtonText, { fontSize: 32 }]}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadRow}>
          {/* Botão de apagar */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setUserInput((prev) => prev.slice(0, -1))}
            accessible={true}
            accessibilityLabel="Apagar último dígito"
          >
            <Text style={styles.actionButtonText}>⌫</Text>
          </TouchableOpacity>

          {/* Dígito 0 */}
          <TouchableOpacity
            key={digits[9]}
            style={styles.digitButton}
            onPress={() => handleDigitPress(digits[9])}
            accessible={true}
            accessibilityLabel={`Dígito ${digits[9]}`}
          >
            <Text style={[styles.digitButtonText, { fontSize: 32 }]}>{digits[9]}</Text>
          </TouchableOpacity>

          {/* Botão de limpar */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setUserInput([])}
            accessible={true}
            accessibilityLabel="Limpar sequência digitada"
          >
            <Text style={styles.actionButtonText}>C</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Confetes */}
      <ConfettiCannon
        count={50}
        origin={{ x: 200, y: 0 }}
        autoStart={false}
        fadeOut={true}
        ref={confettiRef}
      />

      {/* Barra superior com título e score */}
      <View style={styles.topBar}>
        <Text style={styles.levelText}>Nível {level}</Text>
        <Text style={styles.title}> </Text>
        <Text style={styles.scoreText}>{score}</Text>
      </View>

      {displaySequence ? (
        <View style={styles.sequenceContainer}>
          <Text style={styles.sequenceText}>{sequence.join(' ')}</Text>
        </View>
      ) : (
        <View style={styles.inputSection}>
          <View style={styles.userInputContainer}>
            <Text style={styles.userInputText}>{userInput.join(' ')}</Text>
          </View>

          {renderKeypad()}

          <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
            <Text style={styles.checkButtonText}>Verificar</Text>
          </TouchableOpacity>

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
