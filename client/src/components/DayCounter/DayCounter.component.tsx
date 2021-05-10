import React, { FC, useEffect } from 'react';
import './DayCounter.styles.css';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectClockTime,
  selectStartTime,
  startClock,
} from '../../features/game/gameSlice';

const DayCounter: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startClock());
  }, [dispatch]);
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
