'use client';

import { useState, useEffect } from 'react';
import { usePrimaryButton } from '@coinbase/onchainkit/minikit';
import Button from './Button';
import ProgressBar from './ProgressBar';
import ScoreDisplay from './ScoreDisplay';
import { cn } from '../utils/cn';

type Question = {
  id: number;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
};

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "Which mini app is known for decentralized trading?",
    options: ["Uniswap", "OpenSea", "Lens", "Farcaster"],
    correctAnswer: 0,
    explanation: "Uniswap is a leading decentralized exchange (DEX) protocol that allows users to trade cryptocurrencies directly from their wallets.",
    category: "DeFi"
  },
  {
    id: 2,
    prompt: "Which platform hosts these mini apps?",
    options: ["Ethereum", "Base", "Polygon", "Solana"],
    correctAnswer: 1,
    explanation: "Base is Coinbase's Layer 2 blockchain that provides a secure, low-cost environment for building decentralized applications.",
    category: "Blockchain"
  },
  {
    id: 3,
    prompt: "What is the primary purpose of NFT marketplaces like OpenSea?",
    options: ["Trading cryptocurrencies", "Buying and selling NFTs", "Staking tokens", "Mining blocks"],
    correctAnswer: 1,
    explanation: "OpenSea is the largest NFT marketplace where users can buy, sell, and discover unique digital assets.",
    category: "NFTs"
  },
  {
    id: 4,
    prompt: "Which protocol is known for social media on blockchain?",
    options: ["Uniswap", "Lens Protocol", "Compound", "Aave"],
    correctAnswer: 1,
    explanation: "Lens Protocol is a decentralized social media protocol that allows users to own their social graph and content.",
    category: "Social"
  },
  {
    id: 5,
    prompt: "What does 'DeFi' stand for?",
    options: ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"],
    correctAnswer: 1,
    explanation: "DeFi stands for Decentralized Finance, referring to financial services built on blockchain technology without traditional intermediaries.",
    category: "DeFi"
  }
];

export default function QuizComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(MOCK_QUESTIONS.length).fill(false));

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === MOCK_QUESTIONS.length - 1;

  usePrimaryButton(
    { 
      text: quizCompleted ? 'Restart Quiz' : showExplanation ? (isLastQuestion ? 'View Results' : 'Next Question') : 'Submit Answer'
    },
    () => {
      if (quizCompleted) {
        // Restart quiz
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizCompleted(false);
        setShowExplanation(false);
        setAnsweredQuestions(new Array(MOCK_QUESTIONS.length).fill(false));
      } else if (showExplanation) {
        // Move to next question or complete quiz
        if (isLastQuestion) {
          setQuizCompleted(true);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowExplanation(false);
        }
      } else if (selectedAnswer !== null) {
        // Submit answer and show explanation
        if (selectedAnswer === currentQuestion.correctAnswer) {
          setScore(prev => prev + 1);
        }
        setAnsweredQuestions(prev => {
          const newAnswered = [...prev];
          newAnswered[currentQuestionIndex] = true;
          return newAnswered;
        });
        setShowExplanation(true);
      }
    }
  );

  const handleAnswerSelect = (index: number) => {
    if (!showExplanation) {
      setSelectedAnswer(index);
    }
  };

  return (
    <div className="w-full max-w-md">
      {!quizCompleted ? (
        <div className="space-y-6 animate-fade-in">
          {/* Header with progress */}
          <div className="text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-accent">
                {currentQuestion.category}
              </span>
              <span className="text-sm text-muted">
                {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
              </span>
            </div>
            
            <ProgressBar 
              value={answeredQuestions.filter(Boolean).length} 
              max={MOCK_QUESTIONS.length}
              className="mb-6"
            />
          </div>

          {/* Question Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6 leading-relaxed">
              {currentQuestion.prompt}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = 'w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ';
                
                if (showExplanation) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass += 'bg-success/20 border-success text-success font-medium';
                  } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                    buttonClass += 'bg-error/20 border-error text-error';
                  } else {
                    buttonClass += 'bg-surface/50 border-border text-muted';
                  }
                } else if (selectedAnswer === index) {
                  buttonClass += 'bg-primary text-white border-primary shadow-md';
                } else {
                  buttonClass += 'bg-surface border-border text-text hover:bg-surface/80 hover:border-primary/50';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className={cn(
              'card border-l-4',
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'border-l-success bg-success/5' 
                : 'border-l-error bg-error/5'
            )}>
              <div className="flex items-start space-x-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold',
                  selectedAnswer === currentQuestion.correctAnswer ? 'bg-success' : 'bg-error'
                )}>
                  {selectedAnswer === currentQuestion.correctAnswer ? '✓' : '✗'}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-6 animate-fade-in">
          <div className="card">
            <h2 className="text-3xl font-bold mb-6">🎉 Quiz Complete!</h2>
            
            <ScoreDisplay 
              score={score} 
              total={MOCK_QUESTIONS.length}
              className="mb-6"
            />
            
            <div className="space-y-4 text-sm text-muted">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface/50 rounded-lg p-3">
                  <div className="text-success font-semibold">Correct</div>
                  <div className="text-xl font-bold">{score}</div>
                </div>
                <div className="bg-surface/50 rounded-lg p-3">
                  <div className="text-error font-semibold">Incorrect</div>
                  <div className="text-xl font-bold">{MOCK_QUESTIONS.length - score}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p>Ready to try again and improve your score?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
