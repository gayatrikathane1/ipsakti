import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, Square } from 'lucide-react';
import type { LanguageCode } from '../types/ip';

export const VoiceController: React.FC<{ onVoiceResult?: (text: string) => void }> = ({ onVoiceResult }) => {
  const { language, openChatWithPrompt, isSpeaking, stopSpeaking } = useApp();
  const [isListening, setIsListening] = useState<boolean>(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();

    const langMap: Partial<Record<LanguageCode, string>> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      pa: 'pa-IN',
      or: 'or-IN',
      as: 'as-IN',
      ur: 'ur-IN',
      kok: 'kok-IN',
      ne: 'ne-NP',
      ks: 'ks-IN',
      sd: 'sd-IN',
      mai: 'mai-IN',
      doi: 'doi-IN',
      sa: 'sa-IN',
      brx: 'brx-IN',
      sat: 'sat-IN',
      mni: 'mni-IN',
      lus: 'lus-IN',
      kha: 'kha-IN',
      fr: 'fr-FR',
      es: 'es-ES',
      ar: 'ar-SA',
      zh: 'zh-CN',
      ja: 'ja-JP',
    };

    recognition.lang = langMap[language] || 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      if (onVoiceResult) {
        onVoiceResult(transcript);
      } else {
        openChatWithPrompt(transcript);
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="inline-flex items-center space-x-2">
      <button
        onClick={isListening ? () => setIsListening(false) : startListening}
        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
          isListening
            ? 'bg-emerald-800 text-white animate-pulse shadow-md border border-emerald-600'
            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
        }`}
        title="Speak Your Question (Voice Input)"
      >
        {isListening ? <MicOff className="w-4 h-4 text-emerald-200" /> : <Mic className="w-4 h-4 text-emerald-700" />}
        <span>{isListening ? 'Listening...' : '🎤 Speak Question'}</span>
      </button>

      {isSpeaking ? (
        <button
          onClick={stopSpeaking}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-900 hover:bg-emerald-950 text-white transition cursor-pointer shadow border border-emerald-700"
          title="Stop Audio Speech"
        >
          <Square className="w-3.5 h-3.5 fill-current text-emerald-200" />
          <span>Stop Listening</span>
        </button>
      ) : null}
    </div>
  );
};
