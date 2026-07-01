import { VoiceCommandId } from "./commands";
import VoiceOutput from "./VoiceOutput";

export interface CommandExecutorContext {
  navigate?: (path: string) => void;

  dispatch?: (action: unknown) => void;

  actions?: Record<string, () => void>;
}

class CommandExecutor {
  public execute = (
    command: VoiceCommandId,
    context: CommandExecutorContext
  ): boolean => {
    switch (command) {
      case VoiceCommandId.OPEN_DASHBOARD:
        context.navigate?.("/dashboard");
        VoiceOutput.speak("Opening Dashboard");
        return true;

      case VoiceCommandId.OPEN_CUSTOMER:
        context.navigate?.("/customers");
        VoiceOutput.speak("Opening Customer");
        return true;

      case VoiceCommandId.OPEN_SUPPLIER:
        context.navigate?.("/suppliers");
        VoiceOutput.speak("Opening Supplier");
        return true;

      case VoiceCommandId.OPEN_LEDGER:
        context.navigate?.("/ledger");
        VoiceOutput.speak("Opening Ledger");
        return true;

      case VoiceCommandId.OPEN_TRANSACTION:
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