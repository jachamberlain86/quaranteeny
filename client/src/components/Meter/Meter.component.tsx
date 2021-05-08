import React, { FC, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectMeter,
  decayMeter,
  MeterState,
} from '../../features/meter/meterSlice';

import { MeterChange } from '../../interfaces/meterChange.interface';

type MeterProps = {
  meter: MeterChange;
};

const Meter: FC<MeterProps> = ({ meter }: MeterProps) => {
  const { name, amount } = meter;
  const meterState = useAppSelector(selectMeter);
  const meterValue = meterState[name as keyof MeterState];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      decayMeter({
        name,
        amount,
      })
    );
  }, [dispatch, amount, name]);

  return (
    <div>
      {name}
      <progress
        className="nes-progress is-primary"
        value={meterValue}
        max="100"
      />
    </div>
  );
};

// value will come in through props and redux
export default Meter;
