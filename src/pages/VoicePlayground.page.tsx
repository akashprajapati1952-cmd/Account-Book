import { useState } from "react";
import VoiceInput from "../voice/VoiceInput";
import VoiceOutput from "../voice/VoiceOutput";
import commandParser from "../voice/commandParser";

const VoicePlayground = () => {
  const [transcript, setTranscript] = useState("");

  const handleListen = () => {
    VoiceInput.startListening();
  };

  const handleStop = () => {
    VoiceInput.stopListening();
  };

  const handleSpeak = () => {
    VoiceOutput.speak("Hello Akash, Welcome to Account Book.");
  };

  const handleGetTranscript = () => {
    setTranscript(VoiceInput.getTranscript());
  };

  const handleParse = () => {
    console.log(commandParser.parse(transcript));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Voice Playground</h1>

      <button onClick={handleListen}>
        Start Listening
      </button>

      <button onClick={handleStop}>
        Stop Listening
      </button>

      <button onClick={handleGetTranscript}>
        Get Transcript
      </button>

      <button onClick={handleSpeak}>
        Speak
      </button>

      <button onClick={handleParse}>
        Parse Command
      </button>

      <br />
      <br />

      <textarea
        rows={5}
        cols={50}
        value={transcript}
        readOnly
      />
    </div>
  );
};

export default VoicePlayground;