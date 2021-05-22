import React, { useEffect } from 'react';
import './DayCounter.styles.css';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectClockTimeInGame,
  selectStartTime,
  setTimeLasted,
} from '../../features/game/gameSlice';
import { addNewScore } from '../../features/user/userSlice';

const DayCounter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { gameOver } = useAppSelector((state) => state.game);
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
      <div className="conNum__numHeader">
        <p>Quaranteeny has been locked down for:</p>
      </div>
      <div className="conNum__numOfDays">
        <h2>{timeSinceStart}</h2>
      </div>
      <div className="conNum__date"> {date} </div>
      <div className="conNum__clock"> {clock} </div>
    </div>
  );
};

export default DayCounter;
