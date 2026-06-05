import {useState, useEffect} from 'react';
import VoiceInput from './Tools/VoiceInput'
import VoiceOutput from './Tools/VoiceOutput'

function App() {
  
  const {startListening,result}=VoiceInput()
  
  

  

  return (
   <div className="bg-green-400 flex flex-col items-center justify-center h-screen gap-4">
    <button type="button" className='bg-indigo-700 px-2 rounded-md ' onClick={startListening}>speak</button>
    <div className='h-50 w-50 bg-red-500'>{result}</div>
    <button type="button" onClick={()=>VoiceOutput(result)} className='bg-indigo-700 px-2 rounded-md '>Listen</button>
   </div>
  )
}

export default App
