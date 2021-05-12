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

const GameStats: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleExit = (): void => {
    dispatch(setGameOver());
    dispatch(setUserName(''));
    history.push('/');
  };
  const handleResetGame = (): void => {
    checkLoseStates();
    checkConditionsState();
    checkMeterStates();
    startClock();
    decayMeters(meters);
    dispatch(setGameOver());
    history.push('/start');
  };

  return (
    <div>
      <h1>game stats</h1>
      <div className="game-stats-container">
        <h2>Here´s how you did</h2>
        <div>
          <h3>time spent</h3>
          <span>too much</span>
        </div>
        <div>
          <h3>seomthing else...</h3>
        </div>
        <div>
          <h3>seomthing else...</h3>
        </div>
        <button
          type="button"
          className="nes-btn is-success"
          onClick={handleResetGame}
        >
          Play again
        </button>
        <button type="button" className="nes-btn is-error" onClick={handleExit}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default GameStats;
