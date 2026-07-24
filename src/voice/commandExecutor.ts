import type { UnknownAction } from "redux";
import { VoiceCommandId } from "./commands";
import VoiceOutput from "./VoiceOutput";

export interface CommandExecutorContext {
  navigate: (path: string) => void;

  dispatch: (action: UnknownAction) => void;

  actions: Record<string, Function>;

  location: string;
}

class CommandExecutor {
  public execute = (
    command: VoiceCommandId,
    context: CommandExecutorContext
  ): boolean => {
    switch (command) {
      case VoiceCommandId.OPEN_DASHBOARD:
        if(context.location === "/dashboard"){
          VoiceOutput.speak("Already on Dashboard");
          return true;
        }
        context.navigate("/dashboard");
        VoiceOutput.speak("Opening Dashboard");
        return true;

      case VoiceCommandId.OPEN_CUSTOMER:
        if(context.location === "/"){
          VoiceOutput.speak("Already on Customer");
          return true;
        }
        context.navigate?.("/");
        VoiceOutput.speak("Opening Customer");
        return true;
        
      case VoiceCommandId.OPEN_TRANSACTION:
        if(context.location === "/transactions"){
          VoiceOutput.speak("Already on Transaction");
          return true;
        }
        context.navigate?.("/transactions");
        VoiceOutput.speak("Opening Transaction");
        return true;

      case VoiceCommandId.SAVE:
        context.actions?.save?.();
        VoiceOutput.speak("Saved Successfully");
        return true;

      case VoiceCommandId.CANCEL:
        context.actions?.cancel?.();
        VoiceOutput.speak("Cancelled");
        return true;

      case VoiceCommandId.LOGOUT:
        context.actions?.logout?.();
        VoiceOutput.speak("Logging Out");
        return true;

      default:
        VoiceOutput.speak("Command not found");
        return false;
    }
  };
}

const commandExecutor = new CommandExecutor();

export default commandExecutor;