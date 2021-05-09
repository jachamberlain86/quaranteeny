import React, { FC, useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';
import {
  selectNeedsMeters,
  NeedsMetersState,
} from '../../features/needsMeters/needsMetersSlice';
import { decayNeedsMeter } from '../../helpers/meters.helper';

import { needsMeters } from '../../data/needsMeters.data';

type MeterProps = {
  meterName: string;
};

const Meter: FC<MeterProps> = ({ meterName }: MeterProps) => {
  const meter = needsMeters[meterName];
  const needsMetersState = useAppSelector(selectNeedsMeters);
  const meterValue = needsMetersState[meterName as keyof NeedsMetersState];

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
