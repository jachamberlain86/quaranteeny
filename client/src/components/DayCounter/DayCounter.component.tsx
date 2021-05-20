import React, { useEffect } from 'react';
import './DayCounter.styles.css';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectClockTimeInGame,
  selectStartTime,
  setTimeLasted,
  selectTimeLasted,
} from '../../features/game/gameSlice';
import { addNewScore } from '../../features/user/userSlice';
import { day } from '../../data/time.data';

const DayCounter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { gameOver } = useAppSelector((state) => state.game);
  const { userName } = useAppSelector((state) => state.user);
  const startTime = useAppSelector(selectStartTime);
  const currClockTime = useAppSelector(selectClockTimeInGame);

  useEffect(() => {
    if (gameOver) {
      dispatch(setTimeLasted(currClockTime - startTime));
      dispatch(addNewScore(currClockTime - startTime));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const timeSinceStart = moment(startTime).from(currClockTime, true);
  const date = moment(currClockTime).format('ll');
  const clock = moment(currClockTime).format('h:mm a');
  return (
    <div className="conNum">
      <div className="numHeader">
        <p>Quaranteeny has been in lockdown for:</p>
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
