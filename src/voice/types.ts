

export interface VoiceCommand {
  action: string;
  payload?: unknown;
}

export interface VoiceRecognitionResult {
  transcript: string;
  confidence?: number;
}

export interface VoiceOutputOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceName?: string;
}

export interface VoiceInputOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export type VoiceEventType =
  | "start"
  | "end"
  | "pause"
  | "resume"
  | "error"
  | "result"
  | "nomatch"
  | "speechstart"
  | "speechend"
  | "audiostart"
  | "audioend"
  | "soundstart"
  | "soundend";

export type VoiceEventCallback = (
  event?: SpeechSynthesisEvent | SpeechRecognitionEvent | Event
) => void;

export interface VoiceContextType {
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  listening: boolean;
}