import React, { useEffect } from 'react';
import './DayCounter.styles.css';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectClockTimeInGame,
  selectStartTime,
  setTimeLasted,
} from '../../features/game/gameSlice';

const DayCounter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { gameOver } = useAppSelector((state) => state.game);
  const { userName } = useAppSelector((state) => state.user);
  const startTime = useAppSelector(selectStartTime);
  const currClockTime = useAppSelector(selectClockTimeInGame);
  useEffect(() => {
    if (gameOver) {
      dispatch(setTimeLasted(currClockTime - startTime));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const timeSinceStart = moment(startTime).from(currClockTime, true);
  const date = moment(currClockTime).format('ll');
  const clock = moment(currClockTime).format('h:mm a');
  return (
    <div className="conNum">
      <div className="numHeader">
        {userName ? (
          <p>{userName}, you have survived lockdown for:</p>
        ) : (
          <p>You have survived lockdown for:</p>
        )}
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
