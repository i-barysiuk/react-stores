import React from 'react';
import './App.css';

import {ThemeContext, themes} from './theme-context';
import ThemedButton from './components/themed-button';

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      const { light, dark } = themes
      this.setState(state => ({
        theme: state.theme === dark ? light : dark
      }));
    };
  }
  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        <div>
          <ThemedButton>1234</ThemedButton>
        </div>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
