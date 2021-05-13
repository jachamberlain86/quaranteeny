import React from 'react';
import Meter from '../Meter/Meter.component';

const MeterArea = (): JSX.Element => {
  return (
    <div>
      <Meter meterName="hunger" />
      <Meter meterName="energy" />
      <Meter meterName="health" />
      <Meter meterName="money" />
    </div>
  );
};

export default MeterArea;
