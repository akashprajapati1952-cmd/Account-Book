import {
  COMMANDS,
  VoiceCommandDefinition,
} from "./commands";

export interface ParsedCommand {
  command: VoiceCommandDefinition;
  phrase: string;
  confidence: number;
}

class CommandParser {
  /**
   * Normalize text
   */
  private normalize = (text: string): string => {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  };

  /**
   * Parse transcript
   */
  public parse = (
    transcript: string
  ): ParsedCommand | null => {
    const normalized = this.normalize(transcript);

    for (const command of COMMANDS) {
      for (const phrase of command.phrases) {
        if (normalized === this.normalize(phrase)) {
          return {
            command,
            phrase,
            confidence: 1,
          };
        }
      }
    }

    return null;
  };

  /**
   * Check supported command
   */
  public hasCommand = (
    transcript: string
  ): boolean => {
    return this.parse(transcript) !== null;
  };

  /**
   * Get all commands
   */
  public getCommands = (): readonly VoiceCommandDefinition[] => {
    return COMMANDS;
  };
}

const commandParser = new CommandParser();

export default commandParser;