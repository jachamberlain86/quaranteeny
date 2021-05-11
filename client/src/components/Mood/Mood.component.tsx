import React, { FC } from 'react';
import './Mood.styles.css';
import { useAppSelector } from '../../app/hooks';

const Mood: FC = () => {
  const conditions: string[] = useAppSelector(
    (state) => state.sprite.conditions
  );
  const moodList = [...Array.from(new Set(conditions))];

  return (
    <div>
      <h3>I´m feeling a little</h3>
      <ul className="moodList">
        {moodList &&
          moodList.map(
            (mood): JSX.Element => {
              return <li>{mood}</li>;
            }
          )}
      </ul>
    </div>
  );
};

export default Mood;
