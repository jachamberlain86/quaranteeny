import React, { useEffect, useState } from 'react';
import './DayCounter.styles.css';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectClockTimeInGame,
  selectStartTime,
  setTimeLasted,
  selectClockIntervalId,
} from '../../features/game/gameSlice';
import { startClock, stopClock } from '../../helpers/game.helper';
import { selectUserStatus } from '../../features/user/userSlice';

const DayCounter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);
  const { gameOver } = useAppSelector((state) => state.game);
  const clockIntervalId = useAppSelector(selectClockIntervalId);
  const [timeOfDeath, setTimeOfDeath] = useState(0);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      startClock();
    }
  }, [dispatch, userLoadingStatus]);
  const startTime = useAppSelector(selectStartTime);
  const currClockTime = useAppSelector(selectClockTimeInGame);
  useEffect(() => {
    if (gameOver) {
      stopClock(clockIntervalId);
      const momentOfDeath = currClockTime;
      setTimeOfDeath(momentOfDeath);
      dispatch(setTimeLasted(moment(startTime).from(timeOfDeath, true)));
    }
  }, [gameOver]);

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
