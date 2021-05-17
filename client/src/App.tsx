import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from './components/Game/Game.component';
import GameStart from './scenes/GameStart/GameStart.scene';
import GameStats from './scenes/GameStats/GameStats.scene';
import { useAppDispatch } from './app/hooks';
import {
  setUserId,
  fetchUserDataAsync,
  createUserInDbAsync,
} from './features/user/userSlice';
import musicContext from './contexts/music.context';
import { musicController } from './audioControllers/musicController';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      dispatch(setUserId(userIdFromStorage));
      dispatch(fetchUserDataAsync({ dispatch }));
    } else {
      dispatch(createUserInDbAsync({ dispatch }));
    }
  }, [dispatch]);

  return (
    <div className="app-container">
      {/* <soundBarContext.Provider value={SoundBar}> */}
      <musicContext.Provider value={musicController}>
        <Switch>
          <Route path="/start">
            <Game />
          </Route>
          <Route path="/game-stats">
            <GameStats />
          </Route>
          <Route path="/">
            <GameStart />
          </Route>
        </Switch>
        {/* </soundBarContext.Provider> */}
      </musicContext.Provider>
    </div>
  );
};

export default App;
