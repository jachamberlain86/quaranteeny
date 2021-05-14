import React from 'react';
import './GameOver.styles.css';
import { useHistory } from 'react-router-dom';
import { gameOverMusic } from '../../audioControllers/gameOverMusic';
import { btnPressTwo } from '../../audioControllers/buttonSounds';

const GameOver = (): JSX.Element => {
  const history = useHistory();
  const handleGameOver = (): void => {
    gameOverMusic.stop();
    btnPressTwo.play();
    setTimeout(() => {
      history.push('/game-stats');
    }, 200);
  };
  return (
    <div className="game-over-container">
      <div className="nes-container is-dark with-title game-over-tile">
        <h1 className="game-over-title">Game Over</h1>
        <button
          type="button"
          className="continue-btn nes-btn"
          onClick={handleGameOver}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GameOver;
