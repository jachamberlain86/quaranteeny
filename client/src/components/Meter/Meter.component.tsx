import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { MetersState } from '../../features/meters/metersSlice';
import { calcPercentage } from '../../helpers/game.helper';
import { meters } from '../../data/meters.data';
import './Meter.styles.css';

type MeterProps = {
  meterName: string;
};

const Meter = ({ meterName }: MeterProps): JSX.Element => {
  const meter = meters[meterName];
  const currentValue = useAppSelector(
    (state) => state.meters[meterName as keyof MetersState].value
  );

  const meterWarningValue = calcPercentage(
    meters[meterName].deficitPoint,
    meter.max
  );
  const meterExcellentValue = calcPercentage(
    meters[meterName].excessPoint,
    meter.max
  );
  const meterValue = calcPercentage(currentValue, meter.max);
  const meterColor = (): string => {
    if (meterValue <= meterWarningValue) {
      return 'nes-progress is-error meter';
    }
    if (meterValue > meterWarningValue && meterValue < meterExcellentValue) {
      return 'nes-progress is-primary meter';
    }
    return 'nes-progress is-warning meter';
  };

  const renderMeter =
    meterName === 'money' ? (
      <div className="meter-container meter-text">
        {meterName}: £{currentValue}
      </div>
    ) : (
      <div className="meter-container">
        <div
          className={
            meterValue <= meterWarningValue
              ? 'meter-text-warning meter-text'
              : 'meter-text'
          }
        >
          {meterName}: {meterValue}%
        </div>
        <div className={meterValue <= meterWarningValue ? 'meter-warning' : ''}>
          <progress className={meterColor()} value={meterValue} max={100} />
        </div>
      </div>
    );

  return <div>{renderMeter}</div>;
};

// value will come in through props and redux
export default Meter;
