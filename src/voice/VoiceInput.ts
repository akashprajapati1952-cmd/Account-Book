import type {
  VoiceEventCallback,
  VoiceEventType,
} from "./types";


class VoiceInput {
  private recognition: any;

  private listening = false;

  private transcript = "";

  private language = "hi-IN";

  private continuous = false;

  private interimResults = false;

  private maxAlternatives = 1;
  

  private events: Record<VoiceEventType, VoiceEventCallback[]> = {
    start: [],
    end: [],
    pause: [],
    resume: [],
    error: [],
    result: [],
    nomatch: [],
    speechstart: [],
    speechend: [],
    audiostart: [],
    audioend: [],
    soundstart: [],
    soundend: [],
  };

  constructor() {
    const SpeechRecognitionAPI =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      throw new Error(
        "Speech Recognition is not supported in this browser."
      );
    }

   this.recognition = new SpeechRecognitionAPI();

  this.configureRecognition();
  this.registerEvents();
  }

  // Browser Support
  public isSupported = (): boolean => {
    return (
      "SpeechRecognition" in window ||
      "webkitSpeechRecognition" in window
    );
  };

 
  /**
 * Emit Event
 */
  private emit = (
    type: VoiceEventType,
    event: SpeechRecognitionEvent | Event
    ): void => {
    this.events[type]?.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error(error);
      }
    });
  };

/**
 * Configure Recognition
 */
  private configureRecognition = (): void => {
    this.recognition.lang = this.language;
    this.recognition.continuous = this.continuous;
    this.recognition.interimResults = this.interimResults;
    this.recognition.maxAlternatives = this.maxAlternatives;
  };

/**
 * Register Browser Events
 */
  private registerEvents = (): void => {
    this.recognition.onstart = (event: Event) => {
      this.listening = true;
      this.emit("start", event);
    };

    this.recognition.onend = (event: Event) => {
      this.listening = false;
      this.emit("end", event);
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      this.transcript =
        event.results[event.resultIndex][0].transcript;
      this.emit("result", event);
    };

    this.recognition.onerror = (event: SpeechRecognitionEvent) => {
      this.emit("error", event);
    };
  
    this.recognition.onnomatch = (event: Event) => {
      this.emit("nomatch", event);
    };

    this.recognition.onspeechstart = (event: Event) => {
      this.emit("speechstart", event);
    };

    this.recognition.onspeechend = (event: Event) => {
      this.emit("speechend", event);
    };

    this.recognition.onaudiostart = (event: Event) => {
      this.emit("audiostart", event);
    };

    this.recognition.onaudioend = (event: Event) => {
      this.emit("audioend", event);
    };

    this.recognition.onsoundstart = (event: Event) => {
      this.emit("soundstart", event);
    };

    this.recognition.onsoundend = (event: Event) => {
      this.emit("soundend", event);
    };
  };
  /**
 * Start Listening
 */
  public startListening = (): void => {
    if (this.listening) return;

    this.transcript = "";
    this.recognition.start();
  };

/**
 * Stop Listening
 */
  public stopListening = (): void => {
    if (!this.listening) return;
    this.recognition.stop();
  };

/**
 * Abort Listening
 */
  public abortListening = (): void => {
    this.recognition.abort();
  };

/**
 * Restart Listening
 */
  public restartListening = (): void => {
    this.abortListening();
    this.startListening();
  };
  /**
 * Get Transcript
 */
  public getTranscript = (): string => {
    return this.transcript;
  };

/**
 * Clear Transcript
 */
  public clearTranscript = (): void => {
    this.transcript = "";
  };
  /**
 * Is Listening
 */
  public isListening = (): boolean => {
    return this.listening;
  };
  public setLanguage = (lang: string): void => {
    this.language = lang;
    this.recognition.lang = lang;
  };

  public getLanguage = (): string => {
    return this.language;
  };

  public setContinuous = (value: boolean): void => {
    this.continuous = value;
    this.recognition.continuous = value;
  };

  public getContinuous = (): boolean => {
    return this.continuous;
  };
 
  public setInterimResults = (value: boolean): void => {
    this.interimResults = value;
    this.recognition.interimResults = value;
  };

  public getInterimResults = (): boolean => {
    return this.interimResults;
  };

  public setMaxAlternatives = (value: number): void => {
    this.maxAlternatives = value;
    this.recognition.maxAlternatives = value;
  };

  public getMaxAlternatives = (): number => {
    return this.maxAlternatives;
  };
  public toggleListening = (): void => {
    if (this.isListening()) {
      this.stopListening();
    } else {
      this.startListening();
    }
  };
  /**
 * Subscribe Start Event
 */
  public onStart = (callback: VoiceEventCallback): (() => void) => {
    this.events.start.push(callback);

    return () => {
      this.events.start = this.events.start.filter(
        (cb) => cb !== callback
      );
    };
  };

/**
 * Subscribe End Event
 */
  public onEnd = (callback: VoiceEventCallback): (() => void) => {
    this.events.end.push(callback);

    return () => {
      this.events.end = this.events.end.filter(
        (cb) => cb !== callback
      );
    };
  };

/**
 * Subscribe Result Event
 */
  public onResult = (callback: VoiceEventCallback): (() => void) => {
    this.events.result.push(callback);

    return () => {
      this.events.result = this.events.result.filter(
        (cb) => cb !== callback
      );
    };
  };

/**
 * Subscribe Error Event
 */
  public onError = (callback: VoiceEventCallback): (() => void) => {
    this.events.error.push(callback);

    return () => {
      this.events.error = this.events.error.filter(
        (cb) => cb !== callback
      );
    };
  };

/**
 * Subscribe No Match Event
 */
  public onNoMatch = (callback: VoiceEventCallback): (() => void) => {
    this.events.nomatch.push(callback);

    return () => {
      this.events.nomatch = this.events.nomatch.filter(
        (cb) => cb !== callback
      );
    };
  };

/**
 * Remove All Listeners
 */
  public removeAllListeners = (): void => {
    Object.keys(this.events).forEach((key) => {
      this.events[key as VoiceEventType] = [];
    });
  };
}

const voiceInput = new VoiceInput();

export default voiceInput;