import React, { FC } from 'react';
import Meter from '../Meter/Meter.component';

import { meters } from '../../data/meters.data';

const MeterArea: FC = () => {
  return (
    <div>
      <Meter meter={meters.food} />
      <Meter meter={meters.energy} />
      <Meter meter={meters.money} />
    </div>
  );
};

export default MeterArea;
