import React from 'react';
import './MeterArea.styles.css';
import Meter from '../Meter/Meter.component';

const MeterArea = (): JSX.Element => {
  return (
    <div className="MeterArea">
      <Meter meterName="hunger" />
      <Meter meterName="energy" />
      <Meter meterName="health" />
      <Meter meterName="money" />
    </div>
  );
};

export default MeterArea;
