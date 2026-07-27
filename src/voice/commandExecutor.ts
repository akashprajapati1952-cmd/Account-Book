import type { UnknownAction } from "redux";
import { VoiceCommandId } from "./commands";
import VoiceOutput from "./VoiceOutput";

export interface CommandExecutorContext {
  navigate: (path: string) => void;

  dispatch: (action: UnknownAction) => void;

  actions: Record<string, Function>;

  location: string;

  params?: {
    customerId?: string;
  };
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
        if(context.location.match(/^\/customer\/.+$/)){
          VoiceOutput.speak("Already on Transaction");
          return true;
        }
        context.navigate?.(`/customer/${context.params?.customerId}`);
        VoiceOutput.speak("Opening Transaction");
        return true;

      case VoiceCommandId.LOGOUT:
        context.dispatch?.(context.actions?.logoutAction());
        VoiceOutput.speak("Logging Out");
        return true;

      case VoiceCommandId.ADD_CUSTOMER:
        
        VoiceOutput.speak("Please provide customer details to add a new customer");
        return true;

      case VoiceCommandId.LOGIN:
        context.navigate("/login");
        VoiceOutput.speak("Please provide your login credentials");
        return true;

      case VoiceCommandId.FORGET_PASSWORD:
        context.navigate("/forgot-password");
        VoiceOutput.speak("Please provide your email to reset your password");
        return true;

      case VoiceCommandId.SIGNUP:
        context.navigate("/signup");
        VoiceOutput.speak("Please provide your details to create an account");
        return true;

      default:
        VoiceOutput.speak("Command not found");
        return false;
    }
  };
}

const commandExecutor = new CommandExecutor();

export default commandExecutor;