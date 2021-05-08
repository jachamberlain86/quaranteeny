import React from 'react';
import './DayCounter.styles.css';

export default function DayCounter(): React.ReactElement {
  return (
    <div className="conNum">
      <div className="numHeader">Number Of Days</div>
      <div className="numOfDays"> 0? </div>
    </div>
  );
}
