
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

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();
  const viewProfile = useViewProfile();

  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz'>('home');

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
    const result = await addFrame();
    if (result) {
      console.log('Frame added:', result.url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {currentScreen === 'home' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">MiniApp IQ</h1>
          <p className="mb-6">Test your knowledge of the hottest mini apps!</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => setCurrentScreen('quiz')}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Start Quiz
            </button>
            
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={handleAddFrame}
                className="text-sm text-accent"
              >
                Add Frame
              </button>
              <button 
                onClick={() => openUrl('https://0co.to')}
                className="text-sm text-accent"
              >
                Learn More
              </button>
              <button 
                onClick={close}
                className="text-sm text-accent"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'quiz' && <QuizComponent />}
    </div>
  );
}
  