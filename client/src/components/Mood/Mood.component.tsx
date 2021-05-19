import React, { useEffect } from 'react';
import './Mood.styles.css';
import { useAppSelector } from '../../app/hooks';
import { bubblePop } from '../../audioControllers/alerts';

const Mood = (): JSX.Element => {
  const conditions: string[] = useAppSelector(
    (state) => state.sprite.conditions
  );
  const moodList = [...Array.from(new Set(conditions))];

  const renderBoard = (): JSX.Element => {
    return (
      <div className="mood-board">
        <h4>I´m...</h4>
        <div className="Mood__list">
          {moodList &&
            moodList.map(
              (mood, index): JSX.Element => {
                return (
                  <span className="Mood__item" key={mood}>
                    {mood}
                  </span>
                );
              }
            )}
        </div>
      </div>
    );
  };
  return <div>{conditions.length ? renderBoard() : null}</div>;
};

export default Mood;
