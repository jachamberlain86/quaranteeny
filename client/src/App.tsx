import React from 'react';
import './App.css';
import Game from './components/Game/Game.component';

function App(): React.ReactElement {
  return (
    <div className="app-container">
      <Game />
    </div>
  );
}

export default App;
