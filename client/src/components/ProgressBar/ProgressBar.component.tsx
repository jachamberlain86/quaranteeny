import React from 'react';
import './ProgressBar.styles.css';
import { useAppSelector } from '../../app/hooks';

const ProgressBar = (): JSX.Element => {
  const interactionProgress: number | null = useAppSelector(
    (state) => state.sprite.interactionProgress
  );
  let renderedProgressBar;
  if (interactionProgress !== null) {
    renderedProgressBar = (
      <div>
        <div className="meter-container meter-text">
          Progress: {interactionProgress}%
        </div>
        <div className="meter-container">
          <progress
            className="Meter__progress-bar nes-progress is-success"
            value={interactionProgress || 0.1}
            max={100}
          />
        </div>
      </div>
    );
  } else {
    renderedProgressBar = '';
  }

  return <div>{renderedProgressBar}</div>;
};

export default ProgressBar;
