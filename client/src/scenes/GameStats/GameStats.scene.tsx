import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setUserName, setGameOver } from '../../features/game/gameSlice';
import { decayMeters, checkMeterStates } from '../../helpers/meters.helper';
import { meters } from '../../data/meters.data';
import { startClock } from '../../helpers/game.helper';
import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import './GameStats.styles.css';

const GameStats: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const resetGamePlay = (): void => {
    checkLoseStates();
    checkConditionsState();
    checkMeterStates();
    startClock();
    decayMeters(meters);
    dispatch(setGameOver());
  };
  const handleExit = (): void => {
    resetGamePlay();
    dispatch(setUserName(''));
    history.push('/');
  };
  const handleResetGame = (): void => {
    resetGamePlay();
    history.push('/start');
  };

  return (
    <div>
      <div className="game-stats-container">
        <div className="nes-container is-rounded game-stats-title">
          <h1>game stats</h1>
        </div>
        <div className="game-stats-sub-container">
          <h2>Here´s how you did</h2>
          <h3>time spent</h3>
          <span>too much</span>
          <h3>seomthing else...</h3>
          <h3>seomthing else...</h3>
        </div>
        <div className="game-stats-btn-container">
          <button
            type="button"
            className="nes-btn is-success"
            onClick={handleResetGame}
          >
            Play again
          </button>
          <button
            type="button"
            className="nes-btn is-error"
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
