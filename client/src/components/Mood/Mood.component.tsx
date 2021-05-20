import React, { useEffect } from 'react';
import './Mood.styles.css';
import { useAppSelector } from '../../app/hooks';
import { bubblePop } from '../../audioControllers/alerts';

const Mood = (): JSX.Element => {
  const currentThought: string = useAppSelector(
    (state) => state.sprite.currentThought
  );

  const renderBoard = (): JSX.Element => {
    return (
      <div className="mood-board">
        <h4>teeny thoughts:</h4>
        <div className="Mood__list">{currentThought}</div>
      </div>
    );
  };
  return (
    <div className="mood-board">
      <h4>teeny thoughts:</h4>
      <div className="Mood__list">{currentThought}</div>
    </div>
  );
};

export default Mood;
