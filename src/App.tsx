import {useState} from 'react';

function App() {
  const [result, setResult]=useState("");
  const SpeachRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition=new SpeachRecognition();
  if(!SpeachRecognition){
    alert("Your browser does not support speech recognition");
  }
  
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
  

  return (
   <div className="bg-green-400 flex flex-col items-center justify-center h-screen gap-4">
    <button type="button" className='bg-indigo-700 px-2 rounded-md ' onClick={()=>recognition.start()}>speak</button>
    <div className='h-50 w-50 bg-red-500'>{result}</div>
   </div>
  )
}

export default App
