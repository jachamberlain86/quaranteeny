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
      return 'Meter__progress-bar--low meter';
    }
    if (meterValue > meterWarningValue && meterValue < meterExcellentValue) {
      return 'Meter__progress-bar--normal meter';
    }
    return 'Meter__progress-bar--high meter';
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
        <div
          className={
            meterValue <= meterWarningValue
              ? 'meter-warning Meter__progress-bar-wrap'
              : 'Meter__progress-bar-wrap'
          }
        >
          <progress
            className={`Meter__progress-bar ${meterColor()}`}
            value={meterValue}
            max={100}
          />
        </div>
      </div>
    );

  return <div>{renderMeter}</div>;
};

// value will come in through props and redux
export default Meter;
