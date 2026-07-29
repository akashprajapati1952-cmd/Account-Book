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
        if(context.location.match(/^\/customer\/.+$/) && context.location === `/customer/${context.params?.customerId}`){
          VoiceOutput.speak("Already on Transaction");
          return true;
        }
        if(!context.params?.customerId){
          VoiceOutput.speak("Customer not found")
          return true;
        }
        context.navigate?.(`/customer/${context.params?.customerId}`);
        VoiceOutput.speak("Opening Transaction");
        return true;

      case VoiceCommandId.LOGOUT:
        context.dispatch?.(context.actions?.logoutAction());
        VoiceOutput.speak("Logging Out");
        return true;

      case VoiceCommandId.OPEN_ABOUT:
        if(context.location === "/about"){
          VoiceOutput.speak("Already in About section");
          return true;
        }
        context.navigate?.("/about");
        VoiceOutput.speak("Opening About section");
        return true;

      case VoiceCommandId.OPEN_ACCOUNT:
        if(context.location === "/userProfile"){
          VoiceOutput.speak("Already in profile section");
          return true;
        }
        context.navigate?.("/userProfile");
        VoiceOutput.speak("Opening profile section");
        return true;

      case VoiceCommandId.ADD_CUSTOMER:
        if(context.location !== "/"){
          context.navigate?.("/");
        }
        context.dispatch?.(context.actions?.setAddingCustomer(true));
        VoiceOutput.speak("Opening input box for Adding Customer");
        return true;

      case VoiceCommandId.GO_BACK:
        try{
          context.navigate?.(-1);
        }catch(e){
          VoiceOutput.speak("Cannot go back from this page");
          return true;
        }
        VoiceOutput.speak("Going back to the previous page");
        return true;

      case VoiceCommandId.LOGIN:
        
        VoiceOutput.speak("This feature is not implemented yet");
        return true;

      case VoiceCommandId.FORGET_PASSWORD:
   
        VoiceOutput.speak("This feature is not implemented yet");
        return true;

      case VoiceCommandId.SIGNUP:
      
        VoiceOutput.speak("This feature is not implemented yet");
        return true;

      case VoiceCommandId.DELETE_CUSTOMER:
        VoiceOutput.speak("This feature is not implemented yet");
        return true;

      case VoiceCommandId.DELETE_USER:
        VoiceOutput.speak("This feature is not implemented yet");
        return true;

      case VoiceCommandId.ADD_RECEIVED:
        if(!context.location.match(/^\/customer\/.+$/)){
          VoiceOutput.speak("Please go to the customer account in which you want to add the transaction")
          return true;
        }
        context.dispatch?.(context.actions?.setAddingReceived(true));
        VoiceOutput.speak("Opening input box for Received Transaction");
        return true;

      case VoiceCommandId.ADD_GIVEN:
        if(!context.location.match(/^\/customer\/.+$/)){
          VoiceOutput.speak("Please go to the customer account in which you want to add the transaction")
          return true;
        }
        context.dispatch?.(context.actions?.setAddingGiven(true));
        VoiceOutput.speak("Opening input box for Given Transaction");
        return true;

      case VoiceCommandId.SEARCH_CUSTOMER:
        VoiceOutput.speak("This feature is not implemented yet");
        return true;

      default:
        VoiceOutput.speak("Command not found");
        return false;
    }
  };
}

const commandExecutor = new CommandExecutor();

export default commandExecutor;