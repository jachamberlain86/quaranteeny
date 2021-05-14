import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { resetGamePlay } from '../../helpers/game.helper';
import {
  setGameOver,
  setIsCurrentGameActive,
} from '../../features/game/gameSlice';
import { gameStatsMusic } from '../../audioControllers/gameStatsMusic';
// import { setIsCurrentGameActive } from '../../features/user/userSlice';
import './GameStats.styles.css';

const GameStats: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { timeLasted } = useAppSelector((state) => state.game);
  const timeLastedPretty = moment.duration(timeLasted).humanize();

  const handleExit = (): void => {
    resetGamePlay();
    gameStatsMusic.stop();
    setTimeout(() => {
      // TODO delete: here for testing purposes
      // dispatch(setIsCurrentGameActive());
      history.push('/');
    }, 300);
  };
  const handlePlayAgain = (): void => {
    resetGamePlay();
    gameStatsMusic.stop();
    // TODO divide Game start page then push user to choose speed
    history.push('/');
  };

  useEffect(() => {
    gameStatsMusic.play();
  }, []);
  return (
    <div>
      <div className="game-stats-container">
        <div className="nes-container is-rounded game-stats-title">
          <h1>game stats</h1>
        </div>
        <div className="game-stats-sub-container">
          {timeLastedPretty && (
            <h2>Your character survived for {timeLastedPretty}</h2>
          )}
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
            onClick={handlePlayAgain}
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
