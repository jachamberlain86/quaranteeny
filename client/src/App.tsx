import React from 'react';
import './App.css';
import Game from './components/Game/Game.component';

const App = (): JSX.Element => {
  return (
    <div className="app-container">
      <Game />
    </div>
  );
};

export default App;
