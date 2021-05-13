import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './Game.styles.css';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import Player from '../../scenes/Player/player.component';
import GameOver from '../GameOver/GameOver.component';
import CanvasContext from '../../scenes/Player/canvasContext';
import {
  fetchUserDataAsync,
  createUserInDbAsync,
  setUserId,
  selectUserStatus,
  startUpdatesToDb,
} from '../../features/user/userSlice';
import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import { checkMeterStates, decayMeters } from '../../helpers/meters.helper';
import { meters } from '../../data/meters.data';

const Game = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);
  const { gameOver } = useAppSelector((state) => state.game);
  const { userId } = useAppSelector((state) => state.user);
  const gameScreen = useRef<HTMLDivElement | null>(null);
  const currentGameScreen = gameScreen.current as HTMLDivElement;
  useEffect(() => {
    // const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchUserDataAsync({ dispatch }));
    } else {
      dispatch(createUserInDbAsync({ dispatch }));
    }
  }, [dispatch]);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      dispatch(startUpdatesToDb());
      checkMeterStates();
      checkConditionsState();
      checkLoseStates();
      decayMeters(meters);
    }
  }, [dispatch, userLoadingStatus]);

  useEffect(() => {
    const id: NodeJS.Timeout = setTimeout(() => {
      if (currentGameScreen && gameOver) {
        currentGameScreen.classList.add('grey');
      }
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [gameOver]);

  return (
    <div ref={gameScreen} className={gameOver ? 'game fadeToGrey' : 'game'}>
      {gameOver && <GameOver />}
      <div>
        <DayCounter />
        <Mood />
      </div>
      <Room />
      <MeterArea />
    </div>
  );
};

export default Game;
