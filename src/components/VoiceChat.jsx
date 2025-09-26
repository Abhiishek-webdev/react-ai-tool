import React, { useState, useEffect } from "react";

export default function VoiceChat({ onResult }) {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.lang = "en-US";
      recog.interimResults = false;

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript); // send result back to App
      };

      recog.onend = () => setListening(false);

      setRecognition(recog);
    } else {
      alert("❌ Sorry, your browser doesn’t support voice recognition.");
    }
  }, [onResult]);

  const toggleListening = () => {
    if (!recognition) return;

    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`ml-1 px-2 py-1 rounded-full ${
        listening ? "bg-none" : "bg-none"
      } text-white pl-2`}
    >
      {listening ? "🎤" : "🎙️"}
    </button>
  );
}
