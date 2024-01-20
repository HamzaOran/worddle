"use client"

import React, { useEffect, useState } from 'react'

const Wordle = () => {
const [guess, setGuess] = useState<Array<string>>([])
const [guessAll, setGuessAll] = useState<Array<Array<string>>>([])
    useEffect(() => {

const handleKeyFunction = (e: KeyboardEvent) => {
const letterControl = /^[a-z]$/.test(e.key)

const backspace = e.key === "Backspace";
const enter = e.key === "Enter"


if(backspace) {
setGuess(guess.filter(gss => gss !== guess[guess.length -1]))
} else if(letterControl && guess.length < 5){
    setGuess(prev => [...prev, e.key])
} else if(enter && guess.length === 5){
setGuessAll(prev => [...prev, guess])
setGuess([])
}
}

        window.addEventListener("keydown", handleKeyFunction)
        return () => {
            window.removeEventListener("keydown", handleKeyFunction)
        }
    }, [guess])
    console.log("guessAll", guessAll)
  return (
    <div>
        {
            Array.from({length: 5}).map((_,i) => {
                return <div key={i}>{guess[i]}</div>
            })
        }
    </div>
  )
}

export default Wordle