import React from 'react';
import './App.css';

import {createStore, createEvent} from 'effector'
import {useStore} from 'effector-react'
 
const increment = createEvent('increment')
const decrement = createEvent('decrement')
const resetCounter = createEvent('reset counter')
 
const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter)
 
const Counter = () => {
  const value = useStore(counter)
 
  return (
    <>
      <div>{value}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={resetCounter}>reset</button>
    </>
  )
}

function App() {
  return (
    <Counter />
  );
}

export default App;
