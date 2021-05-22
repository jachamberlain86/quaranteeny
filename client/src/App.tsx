import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import './Root.styles.css';
import { Switch, Route, useLocation } from 'react-router-dom';

import Game from './components/Game/Game.component';
import Home from './components/Home/Home.component';
import GameStats from './scenes/GameStats/GameStats.scene';
import NewGameScreen from './scenes/NewGameScreen/NewGameScreen.scene';
import './pageTransitions/slideTransitions.css';

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

  // eslint-disable-next-line
  const getPathDepth = (location: any): number => {
    let pathArr = location.pathname.split('/');
    pathArr = pathArr.filter((n: string) => n !== '');
    return pathArr.length;
  };

  const location = useLocation();
  const timeout = { enter: 800, exit: 400 };

  const [currentKey, setCurrentKey] = useState(
    location.pathname.split('/')[1] || '/'
  );
  const [prevDepth, setPrevDepth] = useState(getPathDepth(location));

  useEffect(() => {
    setPrevDepth(getPathDepth(location));
  }, [location]);

  useEffect(() => {
    setCurrentKey(location.pathname.split('/')[1] || '/');
  }, [location]);

  return (
    <TransitionGroup component="div" className="App">
      <CSSTransition
        key={currentKey}
        timeout={timeout}
        classNames="pageSlider"
        mountOnEnter={false}
        mountOnExit
      >
        <div
          className={getPathDepth(location) - prevDepth >= 0 ? 'left' : 'right'}
        >
          <musicContext.Provider value={musicController}>
            <Switch location={location}>
              <Route exact path="/start">
                <Game />
              </Route>
              <Route exact path="/game-over">
                <GameStats />
              </Route>
              <Route exact path="/new-game">
                <NewGameScreen />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </musicContext.Provider>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
