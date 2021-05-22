import React, { FC } from 'react';
import './GameOverBtn.styles.css';
import { useAppDispatch } from '../../app/hooks';
import {
  setGameOver,
  setIsCurrentGameActive,
} from '../../features/game/gameSlice';
import {
  handleBtnHoverEnter,
  handleBtnHoverLeave,
} from '../../audioControllers/buttonSounds';
import { stopObjectSound } from '../../audioControllers/houseObjectsSounds';

const GameOverBtn = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    stopObjectSound();
    dispatch(setGameOver());
    dispatch(setIsCurrentGameActive());
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleBtnHoverEnter}
        onMouseLeave={handleBtnHoverLeave}
        className="game_over_button"
      >
        Give up? Go outside...
      </button>
    </div>
  );
};

export default GameOverBtn;
