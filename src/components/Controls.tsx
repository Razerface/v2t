import React from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onStop: () => void;
  hasText: boolean;
}

export function Controls({ isPlaying, onTogglePlayPause, onStop, hasText }: ControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onTogglePlayPause}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-500 dark:hover:bg-indigo-600"
        disabled={!hasText}
      >
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            <span>Speak</span>
          </>
        )}
      </button>
      <button
        onClick={onStop}
        className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        disabled={!isPlaying}
      >
        <Volume2 className="w-5 h-5" />
        <span>Stop</span>
      </button>
    </div>
  );
}