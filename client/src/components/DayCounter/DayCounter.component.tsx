import React, { useEffect } from 'react';
import './DayCounter.styles.css';
import moment from 'moment';
import { useAppSelector } from '../../app/hooks';
import {
  selectClockTime,
  selectStartTime,
} from '../../features/game/gameSlice';
import { startClock } from '../../helpers/game.helper';

const DayCounter = (): JSX.Element => {
  useEffect(() => {
    startClock();
  }, []);
  const startTime = useAppSelector(selectStartTime);
  const currClockTime = useAppSelector(selectClockTime);

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
