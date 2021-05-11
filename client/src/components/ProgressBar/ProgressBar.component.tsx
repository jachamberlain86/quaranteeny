import React from 'react';
import './ProgressBar.styles.css';
import { useAppSelector } from '../../app/hooks';

const ProgressBar = (): JSX.Element => {
  const interactionProgress: number | null = useAppSelector(
    (state) => state.sprite.interactionProgress
  );

  const displayProgressBar = (): JSX.Element => (
    <progress
      className="nes-progress is-success"
      value={interactionProgress || 0.1}
      max={100}
    />
  );

  return (
    <div className="interaction-progress">
      {interactionProgress ? displayProgressBar() : null}
    </div>
  );
};

export default ProgressBar;
