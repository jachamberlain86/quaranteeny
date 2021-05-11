import React, { useEffect } from 'react';
import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import { checkMeterStates } from '../../helpers/meters.helper';
// eslint-disable-next-line import/no-unresolved
import ProgressBar from '../../components/ProgressBar/ProgressBar.component';
import './Sprite.styles.css';

const Sprite = (): JSX.Element => {
  useEffect(() => {
    checkMeterStates();
    checkConditionsState();
    checkLoseStates();
  }, []);
  return (
    <div>
      <ProgressBar />
      <div className="sprite" />
    </div>
  );
};

export default Sprite;
