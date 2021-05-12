import React, { FC } from 'react';
import './GameOver.styles.css';

const GameOver: FC = () => {
  return (
    <div className="game-over-container">
      <div className="nes-container is-dark with-title game-over-tile">
        <h1 className="game-over-title">Game Over</h1>
      </div>
      <div>
        <button type="button" className="continue-btn nes-btn">
          Continue
        </button>
      </div>
    </div>
  );
};

export default GameOver;
