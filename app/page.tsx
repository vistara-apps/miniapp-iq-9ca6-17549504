'use client';

import { useState, useEffect } from 'react';
import { 
  useMiniKit, 
  useAddFrame, 
  useOpenUrl, 
  useClose, 
  usePrimaryButton, 
  useViewProfile 
} from '@coinbase/onchainkit/minikit';
import QuizComponent from './components/QuizComponent';
import Button from './components/Button';

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();
  const viewProfile = useViewProfile();

  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz'>('home');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  usePrimaryButton(
    { 
      text: currentScreen === 'home' ? 'Start Quiz' : 'Back to Home' 
    },
    () => {
      setCurrentScreen(current => 
        current === 'home' ? 'quiz' : 'home'
      );
    }
  );

  const handleAddFrame = async () => {
    setIsLoading(true);
    try {
      const result = await addFrame();
      if (result) {
        console.log('Frame added:', result.url);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = () => {
    setCurrentScreen('quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {currentScreen === 'home' && (
          <div className="w-full max-w-md animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-glow animate-pulse-glow">
                  <span className="text-3xl">🧠</span>
                </div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  MiniApp IQ
                </h1>
                <p className="text-muted text-lg leading-relaxed">
                  Test your knowledge of the hottest mini apps and blockchain technology!
                </p>
              </div>
            </div>

            {/* Main Action Card */}
            <div className="card-hover mb-6 text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted">Ready to challenge yourself?</span>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                </div>
                
                <Button 
                  onClick={handleStartQuiz}
                  size="lg"
                  className="w-full mb-4 shadow-glow hover:shadow-hover"
                >
                  🚀 Start Quiz Challenge
                </Button>
                
                <div className="text-xs text-muted">
                  • Multiple choice questions<br/>
                  • Instant feedback<br/>
                  • Track your progress
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={handleAddFrame}
                variant="secondary"
                loading={isLoading}
                className="w-full"
              >
                📌 Add to Frames
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => openUrl('https://0co.to')}
                  variant="accent"
                  size="sm"
                  className="w-full"
                >
                  📚 Learn More
                </Button>
                <Button 
                  onClick={close}
                  variant="accent"
                  size="sm"
                  className="w-full"
                >
                  ✕ Close
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted">
                Powered by Base • Built with ❤️
              </p>
            </div>
          </div>
        )}

        {currentScreen === 'quiz' && (
          <div className="w-full max-w-md animate-slide-up">
            <QuizComponent />
          </div>
        )}
      </div>
    </div>
  );
}
