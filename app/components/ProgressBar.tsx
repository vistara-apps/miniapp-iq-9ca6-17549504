'use client';

import { cn } from '../utils/cn';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function ProgressBar({ 
  value, 
  max, 
  className, 
  showLabel = false, 
  label,
  animated = true 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text">
            {label || `Progress`}
          </span>
          <span className="text-sm text-muted">
            {value}/{max}
          </span>
        </div>
      )}
      <div className="progress-bar">
        <div 
          className={cn(
            'progress-fill',
            animated && 'transition-all duration-500 ease-out'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
