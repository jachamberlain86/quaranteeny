import React from 'react';
import './Mood.styles.css';
import { useAppSelector } from '../../app/hooks';

const Mood = (): JSX.Element => {
  const currentThought: string = useAppSelector(
    (state) => state.sprite.currentThought
  );

  return (
    <div className="mood-board">
      <h4>teeny thoughts:</h4>
      <div className="Mood__list">{currentThought}</div>
    </div>
  );
};

export default Mood;
