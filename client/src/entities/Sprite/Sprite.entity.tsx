import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import { checkMeterStates } from '../../helpers/meters.helper';
import { selectUserStatus } from '../../features/user/userSlice';

import './Sprite.styles.css';

const Sprite: FC = () => {
  const userLoadingStatus = useAppSelector(selectUserStatus);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      checkMeterStates();
      checkConditionsState();
      checkLoseStates();
    }
  }, [userLoadingStatus]);
  return <div className="sprite" />;
};

export default Sprite;
