import React, { FC } from 'react';
import './DayCounter.styles.css';

const DayCounter: FC = () => {
  return (
    <div className="conNum">
      <div className="numHeader">Number Of Days</div>
      <div className="numOfDays"> 0? </div>
    </div>
  );
};

export default DayCounter;
