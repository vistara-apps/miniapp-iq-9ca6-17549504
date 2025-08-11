
'use client';

import { useState, useEffect } from 'react';
import { usePrimaryButton } from '@coinbase/onchainkit/minikit';

type Question = {
  id: number;
  prompt: string;
  options: string[];
  correctAnswer: number;
};

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "Which mini app is known for decentralized trading?",
    options: ["Uniswap", "OpenSea", "Lens", "Farcaster"],
    correctAnswer: 0
  },
  {
    id: 2,
    prompt: "Which platform hosts these mini apps?",
    options: ["Ethereum", "Base", "Polygon", "Solana"],
    correctAnswer: 1
  }
];

export default function QuizComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];

  usePrimaryButton(
    { 
      text: quizCompleted ? 'Restart Quiz' : 'Next Question'
    },
    () => {
      if (quizCompleted) {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizCompleted(false);
      } else {
        if (selectedAnswer === currentQuestion.correctAnswer) {
          setScore(prev => prev + 1);
        }

        if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          setQuizCompleted(true);
        }
      }
    }
  );

  return (
    <div className="w-full max-w-md">
      {!quizCompleted ? (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {currentQuestion.prompt}
          </h2>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`
                  w-full text-left px-4 py-2 rounded-md
                  ${selectedAnswer === index 
                    ? 'bg-primary text-white' 
                    : 'bg-surface text-text'}
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">
            Your Score: {score} / {MOCK_QUESTIONS.length}
          </p>
        </div>
      )}
    </div>
  );
}
  