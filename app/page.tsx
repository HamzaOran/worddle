"use client"

import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect } from 'react'
import Guess from "./components/Guess"
import Querty from './components/Qwerty'
import PuzzleStore from './store/PuzzleStore'

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore)
  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [store])
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center ">
      <h1 className=" text-6xl font-bold mb-12 text-black">
        WORDLE
      </h1>
      {store.guesses.map((_, i) => (
        <Guess
          key={i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {store.won && <h1>You won!</h1>}
      {store.lost && <h1>You lost!</h1>}
      {(store.won || store.lost) && (
        <button onClick={store.init}>Play Again</button>
      )}
      <Querty store={store} />
    </div>
  )
})