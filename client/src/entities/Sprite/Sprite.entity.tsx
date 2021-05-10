import React, { FC, useEffect } from 'react';
import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import { checkMeterStates } from '../../helpers/meters.helper';

import './Sprite.styles.css';

const Sprite: FC = () => {
  useEffect(() => {
    checkMeterStates();
    checkConditionsState();
    checkLoseStates();
  }, []);
  return <div className="sprite" />;
};

export default Sprite;
