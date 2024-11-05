import React from 'react';
import { Volume2 } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  return (
    <div className="flex items-center gap-4">
      <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[3ch]">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
}