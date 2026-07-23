import {type FC, useEffect, useState } from "react";
import { BsMicFill } from "react-icons/bs";
import VoiceInput from "../voice/VoiceInput";
import VoiceOutput from "../voice/VoiceOutput";
import commandParser from "../voice/commandParser";
import type { VoiceCommandDefinition } from "../voice/commands";

const VoiceCommand: FC = () => {
    const [transcript, setTranscript] = useState<VoiceCommandDefinition | null>(null);
    useEffect(()=>{
        if(transcript){
            VoiceOutput.speak(transcript.description);
        }
    },[transcript])

    useEffect(()=>{
        VoiceInput.onResult(()=>{
            const parsedCommand = commandParser.parse(VoiceInput.getTranscript());
            if(!parsedCommand){
                VoiceOutput.speak("क्षमा करें मै समझ नहीं पाई");
                return
            }
            setTranscript(parsedCommand?.command)
        });
    }, []);

  

    const handleParse = () => {
      console.log();
    };

    const handleListen = () => {
      VoiceInput.startListening();
    };

    return <BsMicFill onClick={handleListen}/>
}

export default VoiceCommand;