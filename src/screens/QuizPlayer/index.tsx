import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const GET_QUIZ = gql`
  query GetQuiz {
    allQuizzes {
      nodes {
        id
        question
        answer1
        answer2
        answer3
        answer4
        correctAnswer
      }
    }
  }
`;

const QuizPlayer = () => {
  const { data, loading, error } = useQuery(GET_QUIZ);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && data) {
      setCurrentQuestion(0);
    }
  }, [data, loading]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading quiz.</Text>;

  const quiz = data.allQuizzes.nodes;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleBackToHome = () => {
    navigation.navigate('HomePage' as never);
  };

  const handleNextQuestion = () => {
    const correctAnswer = quiz[currentQuestion].correctAnswer;

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    }
    // Move to the next question or finish quiz
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null); // Reset selected answer
    } else {
      setIsQuizFinished(true);
    }
  };

  const getEmojiBasedOnScore = () => {
    const percentageScore = (score / quiz.length) * 10; // Scale score to a 10-point system

    if (percentageScore === 10) return '🎉'; // Perfect score (10/10)
    if (percentageScore >= 8) return '😊'; // Good (8-9/10)
    if (percentageScore >= 6) return '😌'; // Okay (6-7/10)
    if (percentageScore >= 4) return '😕'; // Needs improvement (4-5/10)
    return '😢'; // Poor (0-3/10)
  };

  if (isQuizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Quiz Finished!</Text>
        <Text style={styles.scoreText}>
          Your Score: {score}/{quiz.length}
        </Text>
        <Text style={styles.emojiText}>{getEmojiBasedOnScore()}</Text>

        <TouchableOpacity
          onPress={handleBackToHome}
          style={{
            backgroundColor: 'blue',
            padding: 12,
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            borderRadius: 10,
            marginTop: 30,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Back To Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{quiz[currentQuestion].question}</Text>
      <View style={styles.answersContainer}>
        {quiz[currentQuestion].answer1 && (
          <TouchableOpacity
            style={[
              styles.answerButton,
              selectedAnswer === 1 && styles.selectedAnswer,
            ]}
            onPress={() => handleAnswerSelect(1)}
          >
            <Text>{quiz[currentQuestion].answer1}</Text>
          </TouchableOpacity>
        )}
        {quiz[currentQuestion].answer2 && (
          <TouchableOpacity
            style={[
              styles.answerButton,
              selectedAnswer === 2 && styles.selectedAnswer,
            ]}
            onPress={() => handleAnswerSelect(2)}
          >
            <Text>{quiz[currentQuestion].answer2}</Text>
          </TouchableOpacity>
        )}
        {quiz[currentQuestion].answer3 && (
          <TouchableOpacity
            style={[
              styles.answerButton,
              selectedAnswer === 3 && styles.selectedAnswer,
            ]}
            onPress={() => handleAnswerSelect(3)}
          >
            <Text>{quiz[currentQuestion].answer3}</Text>
          </TouchableOpacity>
        )}
        {quiz[currentQuestion].answer4 && (
          <TouchableOpacity
            style={[
              styles.answerButton,
              selectedAnswer === 4 && styles.selectedAnswer,
            ]}
            onPress={() => handleAnswerSelect(4)}
          >
            <Text>{quiz[currentQuestion].answer4}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={handleNextQuestion}
        disabled={selectedAnswer === null}
        style={{
          backgroundColor: 'green',
          padding: 12,
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          alignSelf: 'flex-end',
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 20,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answersContainer: {
    marginBottom: 20,
  },
  answerButton: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedAnswer: {
    backgroundColor: '#cceeff',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 20,
    marginTop: 10,
  },
  emojiText: {
    fontSize: 40,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default QuizPlayer;
