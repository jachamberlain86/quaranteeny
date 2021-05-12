import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import { checkMeterStates } from '../../helpers/meters.helper';
import { selectUserStatus } from '../../features/user/userSlice';
// eslint-disable-next-line import/no-unresolved
import ProgressBar from '../../components/ProgressBar/ProgressBar.component';
import './Sprite.styles.css';

const Sprite = (): JSX.Element => {
  const userLoadingStatus = useAppSelector(selectUserStatus);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      checkMeterStates();
      checkConditionsState();
      checkLoseStates();
    }
  }, [userLoadingStatus]);
  return (
    <div>
      <ProgressBar />
      <div className="sprite" />
    </div>
  );
};

export default Sprite;
