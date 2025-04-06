import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
// Você pode unificar para um único arquivo de estilos ou
// adaptar para seu projeto. Aqui deixo tudo em um único lugar
// para facilitar o exemplo.

// import { useTTS } from '../hooks/useTTS'; // Exemplo: hook para Text-To-Speech (se desejar)
export default function RepetitionSpanExerciseScreen({ navigation }) {
  // ESTADOS
  const [sequence, setSequence] = useState([]);
  const [displaySequence, setDisplaySequence] = useState(true);
  const [userInput, setUserInput] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(2); // Nível inicial
  const [showNextButton, setShowNextButton] = useState(false);

  // UseRef para armazenar o timeout e poder limpar na desmontagem
  const hideSequenceTimeout = useRef(null);

  // ==============================
  // FUNÇÕES AUXILIARES
  // ==============================

  /**
   * Gera uma sequência de números de 0 a 9 com tamanho igual ao nível atual.
   */
  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < level; i++) {
      newSequence.push(Math.floor(Math.random() * 10));
    }
    return newSequence;
  };

  /**
   * Compara se o array de input do usuário é igual à sequência sorteada.
   */
  const isUserInputCorrect = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  /**
   * Inicia ou reseta o estado para uma nova rodada.
   */
  const startNewRound = () => {
    // Gera a nova sequência
    const seq = generateSequence();
    setSequence(seq);
    setDisplaySequence(true);
    setUserInput([]);
    setFeedback('');
    setShowNextButton(false);

    // Tempo de exibição da sequência (exemplo: 1000 ms por dígito)
    // Você pode ajustar para ficar fixo ou dinâmico.
    const displayTime = 1000 * level;

    // Limpa qualquer timeout anterior e define um novo
    if (hideSequenceTimeout.current) {
      clearTimeout(hideSequenceTimeout.current);
    }
    hideSequenceTimeout.current = setTimeout(() => {
      setDisplaySequence(false);
    }, displayTime);
  };

  /**
   * Trata clique do usuário num dígito
   */
  const handleDigitPress = (digit) => {
    // Não permite digitar enquanto a sequência é exibida
    if (displaySequence) return;
    setUserInput((prev) => [...prev, digit]);
  };

  /**
   * Verifica se a sequência do usuário está correta
   */
  const checkAnswer = () => {
    if (isUserInputCorrect(userInput, sequence)) {
      setFeedback('Correto!');
      setShowNextButton(true);
    } else {
      setFeedback('Incorreto. Tente novamente.');
    }
  };

  /**
   * Passa para o próximo nível
   */
  const handleNext = () => {
    setLevel((prev) => prev + 1);
  };

  // ==============================
  // CICLO DE VIDA
  // ==============================
  // Sempre que o nível mudar, inicia uma nova rodada
  useEffect(() => {
    startNewRound();
    return () => {
      // Cleanup: limpa o timeout ao desmontar
      if (hideSequenceTimeout.current) {
        clearTimeout(hideSequenceTimeout.current);
      }
    };
  }, [level]);

  // ==============================
  // RENDERIZAÇÃO DE COMPONENTES
  // ==============================

  /**
   * Renderiza o “teclado” de dígitos
   */
  const renderKeypad = () => {
    // Você pode programar para exibir todos os dígitos [0..9] dinamicamente,
    // ou fazer manualmente como no seu código original.
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
              accessibilityLabel={`Digito ${digit}`}
            >
              <Text style={styles.digitButtonText}>{digit}</Text>
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
              accessibilityLabel={`Digito ${digit}`}
            >
              <Text style={styles.digitButtonText}>{digit}</Text>
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
              accessibilityLabel={`Digito ${digit}`}
            >
              <Text style={styles.digitButtonText}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* A última “linha” com 0 ou botões especiais */}
        <View style={styles.keypadRow}>
          {/* Botão de apagar (⌫) */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setUserInput((prev) => prev.slice(0, -1))}
            accessible={true}
            accessibilityLabel="Apagar último dígito"
          >
            <Text style={styles.actionButtonText}>⌫</Text>
          </TouchableOpacity>

          {/* Dígito 0 */}
          {digits.slice(9, 10).map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.digitButton}
              onPress={() => handleDigitPress(digit)}
              accessible={true}
              accessibilityLabel={`Digito ${digit}`}
            >
              <Text style={styles.digitButtonText}>{digit}</Text>
            </TouchableOpacity>
          ))}

          {/* Botão de limpar (C) */}
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
      <Text style={styles.title}>Treino de Memória Fonológica</Text>
      <Text style={styles.levelText}>Nível: {level}</Text>

      {displaySequence ? (
        <View style={styles.sequenceContainer}>
          {/* Exibe a sequência de forma visual */}
          <Text style={styles.sequenceText}>{sequence.join(' ')}</Text>

          {/* Botão ou funcionalidade para reproduzir o áudio (TTS, por exemplo) */}
          <TouchableOpacity
            style={styles.audioButton}
            onPress={() => {
              // Aqui você poderia chamar algo como: speakSequence(sequence);
              console.log('Reproduzir áudio da sequência');
            }}
          >
            <Text style={styles.audioButtonText}>Ouvir Sequência</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputSection}>
          <Text style={styles.instruction}>Digite a sequência:</Text>

          <View style={styles.userInputContainer}>
            <Text style={styles.userInputText}>
              {userInput.join(' ')}
            </Text>
          </View>

          {renderKeypad()}

          <TouchableOpacity
            style={styles.checkButton}
            onPress={checkAnswer}
            accessible={true}
            accessibilityLabel="Verificar sequência digitada"
          >
            <Text style={styles.checkButtonText}>Verificar</Text>
          </TouchableOpacity>

          {feedback !== '' && (
            <Text style={styles.feedback}>{feedback}</Text>
          )}

          {showNextButton && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              accessible={true}
              accessibilityLabel="Ir para próximo nível"
            >
              <Text style={styles.nextButtonText}>Próximo Nível</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

// ==============================
// ESTILOS (refatorados para um único objeto)
// ==============================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  levelText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666'
  },
  sequenceContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  sequenceText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333'
  },
  audioButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6C63FF',
    borderRadius: 5
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 16
  },
  inputSection: {
    width: '100%',
    alignItems: 'center'
  },
  instruction: {
    fontSize: 20,
    marginBottom: 15,
    color: '#555'
  },
  userInputContainer: {
    minHeight: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  userInputText: {
    fontSize: 24,
    color: '#333'
  },
  keypadContainer: {
    width: '80%',
    marginBottom: 20
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  digitButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  digitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 20
  },
  checkButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18
  },
  feedback: {
    fontSize: 20,
    color: '#333',
    marginTop: 10
  },
  nextButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18
  }
});
