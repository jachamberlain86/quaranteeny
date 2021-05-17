import React from 'react';
import './ProgressBar.styles.css';
import { useAppSelector } from '../../app/hooks';

const ProgressBar = (): JSX.Element => {
  const interactionProgress: number | null = useAppSelector(
    (state) => state.sprite.interactionProgress
  );

  const displayProgressBar = (): JSX.Element => (
    <div>
      <div className="meter-container meter-text">
        Progress: {interactionProgress}%
      </div>
      <div className="meter-container">
        <progress
          className="nes-progress is-success"
          value={interactionProgress || 0.1}
          max={100}
        />
      </div>
    </div>
  );

  return <div>{interactionProgress ? displayProgressBar() : null}</div>;
};

export default ProgressBar;
