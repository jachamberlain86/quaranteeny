import React, { FC } from 'react';
import './Mood.styles.css';
import { useAppSelector } from '../../app/hooks';

const Mood: FC = () => {
  const conditions: string[] = useAppSelector(
    (state) => state.sprite.conditions
  );

  return (
    <div>
      <h3>I feel a little</h3>
      <ul className="moodList">
        {conditions &&
          conditions.map(
            (condition): JSX.Element => {
              return <li>{condition}</li>;
            }
          )}
      </ul>
    </div>
  );
};

export default Mood;
