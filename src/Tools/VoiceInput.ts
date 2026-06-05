import {useState} from 'react';

export default function VoiceInput(){
  const [result, setResult]=useState("");
  const SpeachRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition=new SpeachRecognition();
  if(!SpeachRecognition){
    alert("Your browser does not support speech recognition");
  }
  const startListening= ()=>recognition.start()
  
  recognition.interimResults=false;
  recognition.lang="en-US";

  recognition.onresult=(event: any)=>{
      console.log("on result");
      console.log(event);
      const current=event.resultIndex;
      const transcript=event.results[current][0].transcript;
      console.log(transcript);
      setResult(transcript);
    }
  return {startListening, result}
}