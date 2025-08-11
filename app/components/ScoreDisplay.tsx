'use client';

import { cn } from '../utils/cn';

interface ScoreDisplayProps {
  score: number;
  total: number;
  className?: string;
  animated?: boolean;
}

export default function ScoreDisplay({ score, total, className, animated = true }: ScoreDisplayProps) {
  const percentage = (score / total) * 100;
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };
  
  const getScoreMessage = () => {
    if (percentage >= 90) return 'Excellent! 🎉';
    if (percentage >= 80) return 'Great job! 👏';
    if (percentage >= 60) return 'Good work! 👍';
    if (percentage >= 40) return 'Not bad! 🤔';
    return 'Keep trying! 💪';
  };

  return (
    <div className={cn('text-center space-y-4', className)}>
      <div className={cn(
        'text-6xl font-bold transition-all duration-500',
        getScoreColor(),
        animated && 'animate-bounce-subtle'
      )}>
        {score}
        <span className="text-2xl text-muted">/{total}</span>
      </div>
      
      <div className="space-y-2">
        <div className={cn(
          'text-xl font-semibold',
          getScoreColor()
        )}>
          {Math.round(percentage)}%
        </div>
        
        <div className="text-lg text-muted">
          {getScoreMessage()}
        </div>
      </div>
      
      {/* Visual score representation */}
      <div className="flex justify-center space-x-1 mt-4">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              i < score 
                ? 'bg-success shadow-glow' 
                : 'bg-surface border border-border',
              animated && 'animate-fade-in'
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
