import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from './components/Game/Game.component';
import GameStart from './scenes/GameStart/GameStart.scene';
import GameOverBtn from './components/GameOverBtn/GameOverBtn.component';

const App = (): JSX.Element => {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/start">
          <Game />
          <GameOverBtn />
        </Route>
        <Route path="/">
          <GameStart />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
