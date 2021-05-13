import React from 'react';
import './GameOver.styles.css';
import { useHistory } from 'react-router-dom';

const GameOver = (): JSX.Element => {
  const history = useHistory();
  return (
    <div className="game-over-container">
      <div className="nes-container is-dark with-title game-over-tile">
        <h1 className="game-over-title">Game Over</h1>
        <button
          type="button"
          className="continue-btn nes-btn"
          onClick={() => history.push('/game-stats')}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GameOver;
