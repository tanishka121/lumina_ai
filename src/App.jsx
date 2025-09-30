import React from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
import "./App.css"
import va from "./assets/ai.png"
import speak from "./assets/speak.gif"
import aiVoice from './assets/aiVoice.gif'
import { useContext } from 'react';
import { datacontext } from './context/UserContext';

const App = () => {
  let {recognition,speaking,setSpeaking,prompt,response,setPrompt,
    setResponse} = useContext(datacontext)

  return (
     <div className="main">
      <img src={va} alt="" id="lumina"/>
      <span>I'm Lumina, Your Advanced Virtual Assistant</span>
      {!speaking ?       <button onClick={()=>{
        setPrompt("Listening... ")
        setSpeaking(true)
        setResponse(false)
    recognition.start()
      }}>Click here <CiMicrophoneOn />
      </button> 
      :
      <div className='response'>
        {!response ? <img src={speak} alt="" id="speak" />
        :
         <img src={aiVoice} alt="" id="aigif" />
        


        
      
      }
        
        <p>{prompt}</p>
      </div> 
      
      }

     </div>

  )
}

export default App
