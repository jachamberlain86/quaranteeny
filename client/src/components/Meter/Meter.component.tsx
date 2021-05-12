import React from 'react';
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
  const meterColor = (): string => {
    if (meterValue <= 20) {
      return 'nes-progress is-error';
    }
    if (meterValue > 20 && meterValue < 90) {
      return 'nes-progress is-primary';
    }
    return 'nes-progress is-warning';
  };

  const renderMeter =
    meterName === 'money' ? (
      <div>
        {meterName}: £{currentValue}
      </div>
    ) : (
      <div>
        {meterName}: {meterValue}%
        <progress className={meterColor()} value={meterValue} max={100} />
      </div>
    );

  return <div>{renderMeter}</div>;
};

// value will come in through props and redux
export default Meter;
