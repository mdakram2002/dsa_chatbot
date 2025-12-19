import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, Square } from 'lucide-react';

export default function VoiceInput({ onTextConverted, disabled }) {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
  } = useSpeechRecognition();

  // Effect 1: Send text when listening stops and we have content
  useEffect(() => {
    if (!listening && transcript) {
      console.log('Voice to text:', transcript);
      onTextConverted(transcript);
      resetTranscript();
    }
  }, [listening, transcript, onTextConverted, resetTranscript]);

  // Effect 2: Auto-stop after 3 seconds of silence
  useEffect(() => {
    if (listening && transcript) {
      // Auto-stop after 3 seconds of no new speech
      const silenceTimer = setTimeout(() => {
        if (listening) {
          console.log('⏱Auto-stopping due to silence');
          handleStopListening();
        }
      }, 3000);

      return () => clearTimeout(silenceTimer);
    }
  }, [transcript, listening]);

  const handleStartListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support speech recognition. Please use Chrome or Edge.");
      return;
    }

    if (!isMicrophoneAvailable) {
      alert('Microphone access is required for voice input. Please check your permissions.');
      return;
    }

    console.log('Starting voice recording...');
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US'
    });
  };

  const handleStopListening = () => {
    console.log('Stopping voice recording...');
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={listening ? handleStopListening : handleStartListening}
        disabled={disabled}
        className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
          listening
            ? 'bg-red-500 text-white animate-pulse shadow-lg'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md hover:shadow-lg'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={listening ? 'Stop recording' : 'Start voice input'}
      >
        {listening ? (
          <Square className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>

      {/* Live feedback with silence indicator */}
      {listening && (
        <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900 rounded-lg max-w-xs">
          <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
            {transcript || "Listening..."}
          </p>
          {transcript && (
            <div className="mt-1 text-xs text-blue-600 dark:text-blue-300">
              Will auto-stop in 3s of silence
            </div>
          )}
        </div>
      )}
    </div>
  );
}