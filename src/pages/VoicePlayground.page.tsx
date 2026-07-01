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
    <div className="p-20">
      <h1>Voice Playground</h1>

      <div
  className=" flex gap-10 mb-20 flex-wrap"
>
  <button type="button" onClick={handleListen}>Start Listening</button>
  <button type="button" onClick={handleStop}>Stop Listening</button>
  <button type="button" onClick={handleGetTranscript}>Get Transcript</button>
  <button type="button" onClick={handleSpeak}>Speak</button>
  <button type="button" onClick={handleParse}>Parse Command</button>
</div>
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