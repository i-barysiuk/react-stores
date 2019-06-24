import React, { useState } from 'react';
import './App.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count => count + 1);
  };

  const handleDecrease = () => {
    setCount(count => count - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>

      <div>
        <button type="button" onClick={handleIncrease}>
          +
        </button>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Counter/>
  );
}

export default App;
