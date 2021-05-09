import React, { FC } from 'react';
import Meter from '../Meter/Meter.component';

const MeterArea: FC = () => {
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
