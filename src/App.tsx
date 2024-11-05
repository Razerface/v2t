import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { VoiceSelector } from './components/VoiceSelector';
import { VolumeControl } from './components/VolumeControl';
import { TextInput } from './components/TextInput';
import { Controls } from './components/Controls';
import { Voice } from './types';

const MAX_CHARS = 5000;

function App() {
  const [isDark, setIsDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speechSynth] = useState(() => window.speechSynthesis);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynth.getVoices().map(voice => ({
        name: voice.name,
        voiceURI: voice.voiceURI,
        lang: voice.lang,
        gender: /female|girl/i.test(voice.name) ? 'Female' : 'Male'
      }));
      setVoices(availableVoices);
      if (availableVoices.length && !selectedVoice) {
        setSelectedVoice(availableVoices[0].voiceURI);
      }
    };

    loadVoices();
    if (speechSynth.onvoiceschanged !== undefined) {
      speechSynth.onvoiceschanged = loadVoices;
    }
  }, [speechSynth, selectedVoice]);

  const speak = useCallback(() => {
    if (!text) return;

    if (utterance) {
      speechSynth.cancel();
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    const voice = speechSynth.getVoices().find(v => v.voiceURI === selectedVoice);
    if (voice) {
      newUtterance.voice = voice;
    }
    newUtterance.volume = volume;

    newUtterance.onend = () => {
      setIsPlaying(false);
    };

    setUtterance(newUtterance);
    speechSynth.speak(newUtterance);
    setIsPlaying(true);
  }, [text, selectedVoice, speechSynth, utterance, volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      speechSynth.pause();
    } else if (speechSynth.paused) {
      speechSynth.resume();
    } else {
      speak();
    }
    setIsPlaying(!isPlaying);
  };

  const stopSpeaking = () => {
    speechSynth.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-colors">
          <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
          
          <div className="space-y-6">
            <VoiceSelector
              voices={voices}
              selectedVoice={selectedVoice}
              onVoiceChange={setSelectedVoice}
            />

            <VolumeControl
              volume={volume}
              onVolumeChange={setVolume}
            />

            <TextInput
              text={text}
              onTextChange={setText}
              maxLength={MAX_CHARS}
            />

            <Controls
              isPlaying={isPlaying}
              onTogglePlayPause={togglePlayPause}
              onStop={stopSpeaking}
              hasText={text.length > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;