import React, { useEffect } from 'react';
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ChatinputProps {
  transcriptf: string;
  setTranscriptf: (transcriptf: string) => void;
}

export const Chatinput: React.FC<ChatinputProps> = ({ transcriptf, setTranscriptf }) => {
  const {
    listening,
    resetTranscript,
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if(!listening){
    setTranscriptf(transcriptf +" "+ transcript);}
    resetTranscript();
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();
  return (
    <div style={{ padding: "30px" , backgroundColor: "rgba(150, 100, 200, 0.2)", display: "flex", justifyContent: "center", alignItems: "center", outline: "none" }}>
      <div 
        onClick={listening ? stopListening : startListening} 
      >
        {listening 
          ? <FaMicrophone style={{ color: 'rgba(0, 100, 255, 1)', transform: 'scale(1.75)' }} /> 
          : <FaMicrophone style={{ transform: 'scale(1.5)' }} />
        }
      </div>
    </div>
  );
};
