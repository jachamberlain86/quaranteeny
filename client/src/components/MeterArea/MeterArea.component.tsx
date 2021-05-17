import React from 'react';
import Meter from '../Meter/Meter.component';
import ProgressBar from '../ProgressBar/ProgressBar.component';

const MeterArea = (): JSX.Element => {
  return (
    <div>
      <Meter meterName="hunger" />
      <Meter meterName="energy" />
      <Meter meterName="health" />
      <Meter meterName="money" />
      <ProgressBar />
    </div>
  );
};

export default MeterArea;
