import React, { useEffect } from 'react';
import './DayCounter.styles.css';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectClockTimeInGame,
  selectStartTime,
} from '../../features/game/gameSlice';
import { startClock } from '../../helpers/game.helper';
import { selectUserStatus } from '../../features/user/userSlice';

const DayCounter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      startClock();
    }
  }, [dispatch, userLoadingStatus]);
  const startTime = useAppSelector(selectStartTime);
  const currClockTime = useAppSelector(selectClockTimeInGame);

  const timeSinceStart = moment(startTime).from(currClockTime, true);
  const date = moment(currClockTime).format('ll');
  const clock = moment(currClockTime).format('h:mm a');
  return (
    <div className="conNum">
      <div className="numHeader">
        <p>Survived lockdown for:</p>
      </div>
      <div className="numOfDays">
        <h2>{timeSinceStart}</h2>
      </div>
      <div className="date"> {date} </div>
      <div className="clock"> {clock} </div>
    </div>
  );
};

export default DayCounter;
