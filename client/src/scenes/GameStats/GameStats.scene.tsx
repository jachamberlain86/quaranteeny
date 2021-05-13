import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setGameOver } from '../../features/game/gameSlice';
import { setUserName } from '../../features/user/userSlice';
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
  const { timeLasted } = useAppSelector((state) => state.game);

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
          {timeLasted && <h2>Your character survived for {timeLasted}</h2>}
          <h3>List of top times</h3>
          <ol className="nes-list is-circle score-list">
            <li>best score</li>
            <li>2nd best score</li>
            <li>etc...</li>
          </ol>
          <p>Had enough, or are you ready to beat the quarantine?</p>
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
