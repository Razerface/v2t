import React from 'react';
import { Voice } from '../types';

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
}

export function VoiceSelector({ voices, selectedVoice, onVoiceChange }: VoiceSelectorProps) {
  return (
    <div>
      <label htmlFor="voice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Voice
      </label>
      <select
        id="voice"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
        value={selectedVoice}
        onChange={(e) => onVoiceChange(e.target.value)}
      >
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name} ({voice.gender})
          </option>
        ))}
      </select>
    </div>
  );
}