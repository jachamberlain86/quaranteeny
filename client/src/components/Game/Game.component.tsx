import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './Game.styles.css';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import GameOver from '../GameOver/GameOver.component';
import {
  selectUserStatus,
  startUpdatesToDb,
} from '../../features/user/userSlice';
import { upHandler, downHandler } from '../../helpers/input.helper';

import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import { startClock } from '../../helpers/game.helper';
import { checkMeterStates, decayMeters } from '../../helpers/meters.helper';
import { meters } from '../../data/meters.data';
import GameOverBtn from '../GameOverBtn/GameOverBtn.component';
import {
  musicEightiesSlowFunk,
  musicChillSong,
} from '../../audioControllers/soundTracks';

const Game = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);
  const { gameOver } = useAppSelector((state) => state.game);
  const gameScreen = useRef<HTMLDivElement | null>(null);
  const currentGameScreen = gameScreen.current as HTMLDivElement;

  useEffect(() => {
    console.log(userLoadingStatus, gameOver);
    if (userLoadingStatus === 'userLoaded' && !gameOver) {
      console.log('game started');
      dispatch(startUpdatesToDb());
      startClock();
      checkMeterStates();
      checkConditionsState();
      checkLoseStates();
      decayMeters(meters);
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  useEffect(() => {
    musicChillSong.play();
  }, []);
  return (
    <div ref={gameScreen} className={gameOver ? 'game fadeToGrey' : 'game'}>
      {gameOver && <GameOver />}
      <div>
        <DayCounter />
        <Mood />
        <GameOverBtn />
      </div>
      <Room />
      <MeterArea />
    </div>
  );
};

export default Game;
