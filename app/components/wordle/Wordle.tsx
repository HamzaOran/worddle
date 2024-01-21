"use client"

import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Wordle.module.css"

type wordleType = {
    wordle: string
}

const Wordle = ({wordle}: wordleType) => {
const [guess, setGuess] = useState<Array<string>>([])
const [guessAll, setGuessAll] = useState<Array<Array<string>>>([])
const [keyboard, setKeyboard] = useState([
    ["q","w","e","r","t","y","u","o","p"],
    ["a","s","d","f","g","h","j","k","l","i"],
    ["DL","z","x","c","v","b","n","m","EN"]
])

if(wordle.length !== 5) {
    throw new Error("You need to enter a 5-letter word")
}

const charMap = useMemo(() => {
return wordle.split("").reduce<Record<string,number>>((acc, char) => {
if(!acc.hasOwnProperty(char)) {
    acc[char] = 1
} else {
    acc[char] += 1
}
return acc
},{})
}, [wordle])

    useEffect(() => {

const handleKeyFunc = (e: KeyboardEvent) => {
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

        window.addEventListener("keydown", handleKeyFunc)
        return () => {
            window.removeEventListener("keydown", handleKeyFunc)
        }
    }, [guess])
    console.log("guessAll", guessAll)

    const addKeyboard = (i:number ,j:number) => {
        const letterControl = /^[a-z]$/.test(keyboard[i][j])

        const backspace = keyboard[i][j] === "DL";
        const enter = keyboard[i][j] === "EN"
        
        
        if(backspace) {
        setGuess(guess.filter(gss => gss !== guess[guess.length -1]))
        } else if(letterControl && guess.length < 5){
            setGuess(prev => [...prev, keyboard[i][j]])
        } else if(enter && guess.length === 5){
        setGuessAll(prev => [...prev, guess])
        setGuess([])
        }
    }

    const isCorrect = guessAll.length > 0 && guessAll[guessAll.length - 1].join("") === wordle;
    const isFailure =! isCorrect && guessAll.length === 6 
  return (
    <div className='flex flex-col justify-center items-center mt-40' >
        <h1 className=' text-4xl font-bold mb-10'>Worddle</h1>
        <PreviousGuess guessAll={guessAll} wordle={wordle} charMap={charMap}/> 

        {!isCorrect && !isFailure  && <CurrentGuess guess={guess}/>}
        {
            Array.from({length: 6 - guessAll.length -(isCorrect ? 0 : 1)}).map((_,i) => {
                return  <NullGuess key={i}/>
            })
        }
       
       

       
        
        <div className='my-6'>
{
    keyboard.map((row, i) => {
        return <div className={styles.row} key={i}>
            {row.map((col,j) => {
                return <div onClick={() => addKeyboard(i,j)} className={styles.col} key={j}>{col}</div>
            })}
        </div>
    })
}
        </div>
        {isCorrect && (
        <div className='flex items-center justify-center text-green-500 text-3xl font-bold mt-4'>
          !!! Correct !!!
        </div>
      )}

      {isFailure && (
        <div className='flex items-center justify-center text-red-500 text-3xl font-bold mt-4'>
          ??? Wrong ???
        </div>
      )}
    </div>
  )
}


type previousGuessSub = {
    all : Array<string>
    wordle: string
    charMap: Record<string,number>
}


const PreviousGuessSub = ({all, wordle, charMap}: previousGuessSub) => {
    const cMap = {...charMap}

    return (

        <div className={styles.cellContainer}>
        {
          all.map((a,i) => {

const wordleLetter = wordle[i]

            let greenControl = wordleLetter === a
            let isPr = false;
            if(!greenControl && cMap[a]){
isPr = true;
cMap[a] -= 1
            }
                return <div  className={`${styles.cell} ${greenControl ? styles.green : ""} ${isPr ? styles.yellow : ""}`} key={i}>{a}</div>
            })
        }
    </div>
        )
}


type previousGuess = {
    guessAll : Array<Array<string>>
    wordle: string
    charMap: Record<string,number>
}


const PreviousGuess = ({guessAll, wordle, charMap}: previousGuess) => {
    return (

        < >
        {
            guessAll.map((all,i) => {
                return <div  key={i}>
<PreviousGuessSub all={all} wordle={wordle} charMap={charMap}/>
                </div>
            })
        }
    </>
        )
}


type currentGuess = {
    guess : Array<string>
}

const CurrentGuess = ({guess}: currentGuess) => {
    return (

        <div className={styles.cellContainer}>
        {
            Array.from({length: 5}).map((_,i) => {
                return <div className={styles.cell}  key={i}>{guess[i]}</div>
            })
        }
    </div>
        )
}

const NullGuess = () => {
    return (

        <div className={styles.cellContainer}>
        {
            Array.from({length: 5}).map((_,i) => {
                return <div  className={styles.cell} key={i}></div>
            })
        }
    </div>
        )
}

export default Wordle;