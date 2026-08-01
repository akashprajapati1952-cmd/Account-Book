import type { UnknownAction } from "redux";
import { VoiceCommandId } from "./commands";
import VoiceOutput from "./VoiceOutput";

export interface CommandExecutorContext {
  navigate: (path: string) => void;

  dispatch: (action: UnknownAction) => void;

  actions: Record<string, Function>;

  location: string;

  isLoggedIn: Boolean;

  params?: {
    customerId?: string;
    customerName?: string;
    query?: string;
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
          window.history.back()
        }catch(e){
          VoiceOutput.speak("Cannot go back from this page");
          return true;
        }
        VoiceOutput.speak("Going back to the previous page");
        return true;

      case VoiceCommandId.LOGIN:
        if(context.isLoggedIn){
          VoiceOutput.speak("Already logged in");
          return true;
        }
        context.navigate("/login")
        VoiceOutput.speak("Opening login page");
        return true;

      case VoiceCommandId.FORGET_PASSWORD:
        if(context.isLoggedIn){
          VoiceOutput.speak("Already logged in");
          return true;
        }
        context.navigate("/forgotPassword")
        VoiceOutput.speak("Opening forget password page");
        return true;

      case VoiceCommandId.SIGNUP:
        if(context.isLoggedIn){
          VoiceOutput.speak("Already logged in");
          return true;
        }
        context.navigate("/signup")
      
        VoiceOutput.speak("opening signup page");
        return true;

      case VoiceCommandId.DELETE_CUSTOMER:
        if(!context.location.match(/^\/customer\/.+$/)){
          VoiceOutput.speak("Please go to the customer account which you want to delete")
          return true;
        }
        const customerId = context.location.split("/")[2];
        if(!customerId){
          VoiceOutput.speak("Customer not found");
          return true;
        }
        context.dispatch?.(context.actions?.deleteCustomer({
              customerId: customerId,
              message: "Deleting Customer...",
            }));
        context.navigate?.("/");
        return true;

      case VoiceCommandId.DELETE_USER:
        if(!context.isLoggedIn){
          VoiceOutput.speak("You are not logged in");
          return true;
        }
        context.dispatch?.(context.actions?.deleteAccount({message: "Deleting Account..."}));
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
        if(!context.params?.customerId){
          VoiceOutput.speak("Customer Not found")
          return true;
        }
        context.dispatch(context.actions?.setQueryAction(context.params.customerName))
        VoiceOutput.speak("searching customer");
        return true;
      
      case VoiceCommandId.SEARCH_CUSTOMERS:
        if(!context.params?.query){
          context.dispatch(context.actions?.getCustomers());
          VoiceOutput.speak("getting customers");
          return true;
        }

        VoiceOutput.speak(`already showing all customers`);
        return true;
      default:
        VoiceOutput.speak("Command not found");
        return false;
    }
  };
}

const commandExecutor = new CommandExecutor();

export default commandExecutor;