import React, { useState } from 'react'
import { createContext } from 'react'
export const datacontext = createContext()
import run from './gemini.js'

const UserContext = ({children}) => {
  let[speaking,setSpeaking] = useState(false)
  let [prompt,setPrompt] = useState("Listening...")
  let [response,setResponse] = useState(false)
    function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1
        text_speak.rate=1
        text_speak.pitch=1
        text_speak.lang="hi-GB"
        window.speechSynthesis.speak(text_speak)
 }

 async function aiResponse(prompt){
    let text = await run(prompt)
    let newText = text.split("**") &&  text.split("*") &&
    text.replace("google","Tanishka Chauhan") &&
    text.replace("Google","Tanishka Chauhan")
    setPrompt(newText)
    speak(newText)
    setResponse(true)
    setTimeout(()=>{
       setSpeaking(false)
    },5000)
  
 }

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new speechRecognition()
recognition.onresult = (e)=>{
    let currentIndex = e.resultIndex
    let transcript = e.results[currentIndex][0].transcript
    setPrompt(transcript)
    takecommand(transcript.toLowerCase())
}

function takecommand(command){
  if(command.includes("open") && command.includes("youtube") ){
            window.open("https://www.youtube.com/","_blank")
            speak("opening Youtube")
            setPrompt("Opening Youtube...")
            setTimeout(()=>{
              setSpeaking(false)
            },5000)
  }
  else if(command.includes("open") && command.includes("google") ){
            window.open("https://www.google.com/","_blank")
            speak("opening Google")
            setPrompt("Opening Google...")
            setTimeout(()=>{
              setSpeaking(false)
            },5000)
  }
  else   if(command.includes("open") && command.includes("instagram") ){
            window.open("https://www.instagram.com/","_blank")
            speak("opening Instagram")
            setPrompt("Opening Instagram...")
            setTimeout(()=>{
              setSpeaking(false)
            },5000)
  }
  else{
    aiResponse(command)
  }
   

}

  let value={
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
}
  return (
    <div>
      <datacontext.Provider value={value}>
          {children}
      </datacontext.Provider>
      
    </div>
  )
}

export default UserContext
