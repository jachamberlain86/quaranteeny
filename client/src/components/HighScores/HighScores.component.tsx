import React, { FC } from 'react';
import moment from 'moment';
import { useAppSelector } from '../../app/hooks';
import { selectScores } from '../../features/user/userSlice';

import './HighScores.styles.css';

const HighScores: FC = () => {
  const scores = useAppSelector(selectScores);
  const sortedScored = scores.slice().sort((a, b) => b - a);
  const scoresPretty = sortedScored.map((score) =>
    moment.duration(score).humanize()
  );
  const topFiveScores = scoresPretty.slice(0, 5);

  let highScoresList;

  if (topFiveScores.length) {
    highScoresList = (
      <ol className="HighScores__list">
        {topFiveScores.map((score, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{score}</li>;
        })}
      </ol>
    );
  } else {
    highScoresList = <div>None yet!</div>;
  }

  return (
    <div className="HighScores__container">
      <h3>High scores</h3>
      {highScoresList}
    </div>
  );
};

export default HighScores;
