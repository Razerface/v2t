import React from 'react';
import { Mic, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Header({ isDark, onThemeToggle }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Mic className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Text to Speech
        </h1>
      </div>
      <button
        onClick={onThemeToggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}