import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import Meter from '../Meter/Meter.component';
import { decayMeters } from '../../helpers/meters.helper';
import { meters } from '../../data/meters.data';
import { selectUserStatus } from '../../features/user/userSlice';

const MeterArea = (): JSX.Element => {
  const userLoadingStatus = useAppSelector(selectUserStatus);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      decayMeters(meters);
    }
  }, [userLoadingStatus]);
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
