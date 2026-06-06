
export default function VoiceOutput(text: string){
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;  // Speed thodi kam/jyada kar sakte hain (0.1 se 10)
    utterance.pitch = 1.0; // Bhaoripan (0 se 2)

    window.speechSynthesis.speak(utterance);
  } else {
    console.log("आपका ब्राउज़र वॉइस आउटपुट सपोर्ट नहीं करता।");
  }
}