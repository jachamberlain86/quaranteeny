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

const Game = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(setUserId(userId));
      dispatch(fetchUserDataAsync({ dispatch }));
    } else {
      dispatch(createUserInDbAsync({ dispatch }));
    }
  }, [dispatch]);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      dispatch(startUpdatesToDb());
    }
  }, [dispatch, userLoadingStatus]);

  const { gameOver } = useAppSelector((state) => state.game);
  // TODO find a better solution to this forbidden non-null assertion
  const gameScreen = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const id: NodeJS.Timeout = setTimeout(() => {
      if (!gameScreen) return;
      if (gameScreen && gameOver) {
        gameScreen.current.classList.add('grey');
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
