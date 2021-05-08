import React, { FC } from 'react';
import './App.css';
import Game from './components/Game/Game.component';

const App: FC = () => {
  return (
    <div className="app-container">
      <Game />
    </div>
  );
};

export default App;
