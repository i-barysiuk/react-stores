import React from 'react';
import logo from './logo.svg';
import './App.css';
import {EventEmitter} from './events'

function Input(){
  return(
    <input onChange={(event)=>EventEmitter.dispatch('changeText', event)}></input>
  );
}

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      text:''
    };
    EventEmitter.subscribe('changeText', (event)=> this.setState({text: event.target.value}));
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.text}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Input></Input>
        </header>
      </div>
    );
  }
  
}

export default App;
