import React, { useState } from 'react';
import Quiz from './Quiz';
import { motion } from 'framer-motion';
import '../App.css';

function App() {
  const [start, setStart] = useState(false);

  return (
    <div className="app min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      {!start ? (
        <motion.div
          className="start-screen text-center p-8 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 mx-auto"
          >
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2" fill="#E8F5E9" />
            <path
              d="M12 6a4 4 0 0 1 4 4h-2a2 2 0 0 0-4 0 2 2 0 0 0 2 2h1v2h-2v2h2v-2h1v-4a4 4 0 0 1-4-4z"
              fill="#4CAF50"
            />
            <circle cx="12" cy="17" r="1" fill="#4CAF50" />
          </svg>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to the Quiz</h1>
          <p className="mb-8 text-gray-700">Test your knowledge with these fun questions!</p>
          <motion.button
            id="start"
            onClick={() => setStart(true)}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Test
          </motion.button>
        </motion.div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
