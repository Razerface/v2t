import React from 'react';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  maxLength: number;
}

export function TextInput({ text, onTextChange, maxLength }: TextInputProps) {
  return (
    <div>
      <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Enter Text
      </label>
      <textarea
        id="text"
        rows={5}
        maxLength={maxLength}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
        placeholder="Type something to convert to speech..."
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
        {text.length}/{maxLength} characters
      </div>
    </div>
  );
}