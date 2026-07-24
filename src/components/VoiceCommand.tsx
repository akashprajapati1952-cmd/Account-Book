import {type FC, useEffect, useState } from "react";
import { BsMicFill } from "react-icons/bs";
import VoiceInput from "../voice/VoiceInput";
import VoiceOutput from "../voice/VoiceOutput";
import commandParser from "../voice/commandParser";
import type { VoiceCommandDefinition, VoiceCommandId } from "../voice/commands";
import commandExecutor from "../voice/commandExecutor";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import actions from "../Tools_And_Data/actions";



const VoiceCommand: FC = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const [transcript, setTranscript] = useState<VoiceCommandDefinition | null>(null);
    useEffect(()=>{
        if(transcript){
            commandExecutor.execute(transcript.id as VoiceCommandId, {dispatch,navigate,actions,location:location.pathname});
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
0
    const handleListen = () => {
      VoiceInput.toggleListening();
    };

    return <BsMicFill onClick={handleListen}/>
}

export default VoiceCommand;