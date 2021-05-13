import React, { FC } from 'react';
import './GameOverBtn.styles.css';
import { useAppDispatch } from '../../app/hooks';
import {
  setGameOver,
  setActiveCurrentGame,
} from '../../features/game/gameSlice';

const GameOverBtn: FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(setGameOver());
    dispatch(setActiveCurrentGame());
  };
  return (
    <div>
      <button type="button" onClick={handleClick} className="nes-btn">
        End game
      </button>
    </div>
  );
};

export default GameOverBtn;
