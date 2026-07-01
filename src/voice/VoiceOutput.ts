import {
  VoiceEventCallback,
  VoiceEventType,
  VoiceOutputOptions,
} from "./types";

class VoiceOutput {
  private synth: SpeechSynthesis;

  private selectedVoice: SpeechSynthesisVoice | null = null;

  private language = "hi-IN";

  private rate = 1;

  private pitch = 1;

  private volume = 1;

  private events: Record<VoiceEventType, VoiceEventCallback[]> = {
    start: [],
    end: [],
    pause: [],
    resume: [],
    error: [],
  };

  constructor() {
    this.synth = window.speechSynthesis;
    this.synth.onvoiceschanged = () => {
      this.selectedVoice = this.getBestVoice();
    };
  }
  /**
 * Check browser support
 */
  public isSupported = (): boolean => {
    return "speechSynthesis" in window;
  };

/**
 * Get all available voices
 */
  public getAvailableVoices = (): SpeechSynthesisVoice[] => {
    return this.synth.getVoices();
  };

/**
 * Get best available voice
 */
  private getBestVoice = (
    lang: string = this.language
    ): SpeechSynthesisVoice | null => {
    const voices = this.getAvailableVoices();

  // 1. Exact language + female preferred
  const femaleVoice = voices.find(
    (voice) =>
      voice.lang.toLowerCase() === lang.toLowerCase() &&
     /(female|woman|zira|aria|heera|samantha|google हिन्दी|google hindi)/i.test(voice.name)
      
  );

  if (femaleVoice) return femaleVoice;
    const sameLanguage = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith(lang.split("-")[0].toLowerCase())
  );

  if (sameLanguage) return sameLanguage;

  // 3. Default voice
    return voices.find((voice) => voice.default) ?? voices[0] ?? null;
  };

/**
 * Select voice manually
 */
  public setVoice = (voiceName: string): boolean => {
    const voice = this.getAvailableVoices().find(
    (item) => item.name === voiceName
    );

    if (!voice) return false;

    this.selectedVoice = voice;

    return true;
  };
  public getSelectedVoice = (): SpeechSynthesisVoice | null => {
    return this.selectedVoice;
  };
/**
 * Set default language
 */
  public setLanguage = (lang: string): void => {
    this.language = lang;
  };

/**
 * Get current language
 */
  public getLanguage = (): string => {
    return this.language;
  };

/**
 * Set speech rate
 * Valid Range: 0.1 - 10
 */
  public setRate = (rate: number): void => {
    if (rate < 0.1 || rate > 10) {
      throw new Error("Speech rate must be between 0.1 and 10.");
    }

    this.rate = rate;
  };

/**
 * Get speech rate
 */
  public getRate = (): number => {
    return this.rate;
  };

/**
 * Set pitch
 * Valid Range: 0 - 2
 */
  public setPitch = (pitch: number): void => {
    if (pitch < 0 || pitch > 2) {
      throw new Error("Pitch must be between 0 and 2.");
    }
    this.pitch = pitch;
  };

/**
 * Get pitch
 */
  public getPitch = (): number => {
    return this.pitch;
  };

/**
 * Set volume
 * Valid Range: 0 - 1
 */
  public setVolume = (volume: number): void => {
    if (volume < 0 || volume > 1) {
      throw new Error("Volume must be between 0 and 1.");
    }

    this.volume = volume;
  };

/**
 * Get volume
 */
  public getVolume = (): number => {
    return this.volume;
  };
/**
 * Speak text
 */
  public speak = (
    text: string,
    options?: VoiceOutputOptions
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error("Speech synthesis is not supported."));
        return;
      }

      if (!text.trim()) {
        resolve();
        return;
      }

    // Agar pehle se bol raha hai to stop
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);

    // Settings
      utterance.lang = options?.lang ?? this.language;
      utterance.rate = options?.rate ?? this.rate;
      utterance.pitch = options?.pitch ?? this.pitch;
      utterance.volume = options?.volume ?? this.volume;

    // Voice Selection
      if (options?.voiceName) {
        this.setVoice(options.voiceName);
      }

      utterance.voice =
        this.selectedVoice ??
        this.getBestVoice(utterance.lang);

    // Events
      utterance.onstart = (event) => {
        this.events.start.forEach(cb => cb(event));
      };

      utterance.onpause = (event) => {
        this.events.pause.forEach(cb => cb(event));
      };

      utterance.onresume = (event) => {
        this.events.resume.forEach(cb => cb(event));
      };

      utterance.onerror = (event) => {
        this.events.error.forEach(cb => cb(event));
        reject(new Error(event.error));
      };

      utterance.onend = (event) => {
        this.events.end.forEach(cb => cb(event));
        resolve();
      };

      this.synth.speak(utterance);
    });
  };
/**
 * Subscribe start event
 */
  public onStart = (callback: VoiceEventCallback): (() => void) => {
    this.events.start.push(callback);

    return () => {
    this.events.start = this.events.start.filter(cb => cb !== callback);
    };
  };

/**
 * Subscribe end event
 */
  public onEnd = (callback: VoiceEventCallback): (() => void) => {
    this.events.end.push(callback);

    return () => {
      this.events.end = this.events.end.filter(cb => cb !== callback);
    };
  };

/**
 * Subscribe pause event
 */
  public onPause = (callback: VoiceEventCallback): (() => void) => {
    this.events.pause.push(callback);

    return () => {
      this.events.pause = this.events.pause.filter(cb => cb !== callback);
    };
  };

/**
 * Subscribe resume event
 */
  public onResume = (callback: VoiceEventCallback): (() => void) => {
    this.events.resume.push(callback);

    return () => {
      this.events.resume = this.events.resume.filter(cb => cb !== callback);
    };
  };

/**
 * Subscribe error event
 */
  public onError = (callback: VoiceEventCallback): (() => void) => {
    this.events.error.push(callback);

    return () => {
      this.events.error = this.events.error.filter(cb => cb !== callback);
    };
  };

/**
 * Remove all listeners
 */
  public removeAllListeners = (): void => {
    this.events = {
      start: [],
      end: [],
      pause: [],
      resume: [],
      error: [],
    };
  };
/**
 * Stop current speech
 */
  public stop = (): void => {
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }
  };

/**
 * Pause current speech
 */
  public pause = (): void => {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  };

/**
 * Resume paused speech
 */
  public resume = (): void => {
    if (this.synth.paused) {
      this.synth.resume();
    }
  };

/**
 * Is currently speaking
 */
  public speaking = (): boolean => {
    return this.synth.speaking;
  };

/**
 * Is speech paused
 */
  public paused = (): boolean => {
    return this.synth.paused;
  };

/**
 * Is any speech pending
 */
  public pending = (): boolean => {
    return this.synth.pending;
  };
}

const voiceOutput = new VoiceOutput();

export default voiceOutput;