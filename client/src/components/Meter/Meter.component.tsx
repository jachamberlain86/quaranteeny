import React, { FC, useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectMeters, MetersState } from '../../features/meters/metersSlice';
import { decayNeedsMeter } from '../../helpers/meters.helper';

import { meters } from '../../data/meters.data';

type MeterProps = {
  meterName: string;
};

const Meter: FC<MeterProps> = ({ meterName }: MeterProps) => {
  const meter = meters[meterName];
  const metersState = useAppSelector(selectMeters);
  const meterValue = metersState[meterName as keyof MetersState].value;

  useEffect(() => {
    decayNeedsMeter({
      name: meterName,
      amount: meter.decayRate,
    });
  }, [meter.decayRate, meterName]);

  return (
    <div>
      {meterName} {meterValue}
      <progress
        className="nes-progress is-primary"
        value={meterValue}
        max={meter.max}
      />
    </div>
  );
};

// value will come in through props and redux
export default Meter;
