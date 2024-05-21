import React, { useState } from 'react';
import questionsData from '../questions';
import Question from './Question';
import { motion } from 'framer-motion';

// Rastgele sıralama fonksiyonu
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Quiz() {
  const [questions, setQuestions] = useState(shuffle([...questionsData]));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // Added state to reset timer

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimerKey((prevKey) => prevKey + 1); // Reset timer by changing the key
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffle([...questionsData]));
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setTimerKey((prevKey) => prevKey + 1); // Reset timer
  };

  if (showResults) {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].answer).length;
    return (
      <motion.div
        className="results text-center p-16 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Quiz Results</h2>
        <p className="text-2xl text-gray-700 mb-4">Correct Answers: {correctAnswers}</p>
        <p className="text-2xl text-gray-700 mb-8">Incorrect Answers: {questions.length - correctAnswers}</p>
        <button
          onClick={handleRestart}
          className="py-4 px-8 bg-blue-500 text-white rounded-lg text-2xl hover:bg-blue-600 transition duration-300"
        >
          Restart Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <Question
      key={timerKey} // Reset the timer by changing the key
      data={questions[currentQuestion]}
      handleAnswer={handleAnswer}
    />
  );
}

export default Quiz;
