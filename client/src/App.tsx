import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from './components/Game/Game.component';
import GameStart from './scenes/GameStart/GameStart.scene';
import GameStats from './scenes/GameStats/GameStats.scene';
import GameOverBtn from './components/GameOverBtn/GameOverBtn.component';
import { useAppDispatch } from './app/hooks';
import {
  setUserId,
  fetchUserDataAsync,
  createUserInDbAsync,
} from './features/user/userSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      dispatch(setUserId(userIdFromStorage));
      // dispatch(fetchUserDataAsync({ dispatch }));
    } else {
      // dispatch(createUserInDbAsync({ dispatch }));
    }
  }, [dispatch]);

  return (
    <div className="app-container">
      <Switch>
        <Route path="/start">
          <Game />
          <GameOverBtn />
        </Route>
        <Route path="/game-stats">
          <GameStats />
        </Route>
        <Route path="/">
          <GameStart />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
