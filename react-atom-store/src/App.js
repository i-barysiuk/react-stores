import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Atom, useAtom, swap} from '@dbeining/react-atom'
const stateAtom = Atom.of({ text: '' })

function Text() {
 const {text} = useAtom(stateAtom)
 return <p>The text is {text}</p>
}

function Input(){
  return (
    <div>
      <input onChange={(e)=>{
          swap(stateAtom, state => ({...state, text: e.target.value}))
      }}></input>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>THE BEST WAY to manage data in react!</h1>
       
        
        <Input></Input>
        <Text></Text>
      </header>
    </div>
  );
}

export default App;
