import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from './components/Game/Game.component';
import GameStart from './scenes/GameStart/GameStart.scene';

const App = (): JSX.Element => {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/start">
          <Game />
        </Route>
        <Route path="/">
          <GameStart />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
