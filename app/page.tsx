"use client"

import React from 'react';
import Wordle from './components/wordle/Wordle';
import words from '../words.json';

export default function Home() {
  
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  return (
    <div className='bg-white'>
      <Wordle wordle={randomWord} />
    </div>
  );
}
