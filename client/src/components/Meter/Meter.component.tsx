import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { MetersState } from '../../features/meters/metersSlice';
import { calcPercentage } from '../../helpers/game.helper';
import { meters } from '../../data/meters.data';

type MeterProps = {
  meterName: string;
};

const Meter = ({ meterName }: MeterProps): JSX.Element => {
  const meter = meters[meterName];
  const currentValue = useAppSelector(
    (state) => state.meters[meterName as keyof MetersState].value
  );

  const meterValue = calcPercentage(currentValue, meter.max);

  const renderMeter =
    meterName === 'money' ? (
      <div>
        {meterName}: £{currentValue}
      </div>
    ) : (
      <div>
        {meterName}: {meterValue}%
        <progress
          className="nes-progress is-primary"
          value={meterValue}
          max={100}
        />
      </div>
    );

  return <div>{renderMeter}</div>;
};

// value will come in through props and redux
export default Meter;
