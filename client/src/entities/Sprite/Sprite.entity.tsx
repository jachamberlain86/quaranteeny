import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ProgressBar from '../../components/ProgressBar/ProgressBar.component';
import './Sprite.styles.css';

const Sprite = (): JSX.Element => {
  return (
    <div>
      <ProgressBar />
      <div className="sprite" />
    </div>
  );
};

export default Sprite;
