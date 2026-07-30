import {type FC, useEffect, useState } from "react";
import { BsMicFill } from "react-icons/bs";
import VoiceInput from "../voice/VoiceInput";
import VoiceOutput from "../voice/VoiceOutput";
import commandParser, { type ParsedCommand } from "../voice/commandParser";
import type { VoiceCommandDefinition, VoiceCommandId } from "../voice/commands";
import commandExecutor from "../voice/commandExecutor";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import actions from "../Tools_And_Data/actions";
import type { CustomersWithId } from "../models";
import { customerListSelector } from "../selectors/customerSelectors";



const VoiceCommand: FC<{isLoggedIn: Boolean}> = ({isLoggedIn}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const [command, setCommand] = useState<ParsedCommand | null>(null);
    
    const customers=useSelector(customerListSelector);

    
    useEffect(()=>{
      if(VoiceInput.getTranscript()){
        const customer=customers.find((customer)=>customer.name.toLowerCase() === command?.params?.customerName?.toLowerCase());
        if(command  ?.command){
            commandExecutor.execute(command?.command.id as VoiceCommandId, {dispatch,navigate,actions,location:location.pathname,isLoggedIn,params: {customerId: customer?.customerId ?? undefined}});
            setCommand(null);
        }
      }
    },[command?.command, customers])

    useEffect(()=>{
        VoiceInput.onResult(()=>{
  
            const parsedCommand = commandParser.parse(VoiceInput.getTranscript());
    
            if(!parsedCommand){
                VoiceOutput.speak("Sorry, I didn't understand that command.");
                return
            }
            setCommand(parsedCommand)
        });
    }, []);
0
    const handleListen = () => {
      VoiceInput.toggleListening();
    };

    return <BsMicFill onClick={handleListen}/>
}

export default VoiceCommand;