import React, { FC } from 'react';
import './GameOver.styles.css';
import { useHistory } from 'react-router-dom';

const GameOver: FC = () => {
  const history = useHistory();
  return (
    <div className="game-over-container">
      <div className="nes-container is-dark with-title game-over-tile">
        <h1 className="game-over-title">Game Over</h1>
      </div>
      <div>
        <button
          type="button"
          className="continue-btn nes-btn"
          onClick={() => history.push('/gameStats')}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GameOver;
