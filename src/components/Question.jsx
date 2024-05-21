import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Question({ data, handleAnswer }) {
  const [showOptions, setShowOptions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 20) setShowOptions(true);
    if (timeLeft === 0) {
      handleAnswer(null);
    }

    const timer = setTimeout(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(30); // Reset the timer when component is mounted or key changes
  }, []);

  const imagePath = new URL(`../assets/${data.media}`, import.meta.url).href;

  return (
    <motion.div
      className="question bg-white shadow-md rounded-lg p-6 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900">{data.question}</h2>
      <img src={imagePath} alt="question media" className="w-full h-auto mb-4 rounded-lg" />
      {showOptions ? (
        <div className="options grid grid-cols-1 gap-2">
          {data.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setShowOptions(false);
                setTimeLeft(30); // Reset the timer when an answer is chosen
                handleAnswer(option);
              }}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mb-4">Options will appear in {timeLeft > 20 ? timeLeft - 20 : timeLeft} seconds</p>
      )}
      <div className="text-gray-500 flex justify-center items-center mt-4">
        <div className="w-full bg-gray-300 rounded-full h-2.5 mr-2">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
        <span>{timeLeft}s</span>
      </div>
    </motion.div>
  );
}

export default Question;
