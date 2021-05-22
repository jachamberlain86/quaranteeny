import React from 'react';

import { btnClickOne } from '../../audioControllers/buttonSounds';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setAllSoundMuted } from '../../features/music/musicSlice';

const MuteSoundBtn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { areAllSoundsMuted } = useAppSelector((state) => state.music);
  const handleMute = (): void => {
    btnClickOne.play();
    dispatch(setAllSoundMuted());
  };
  return (
    <button
      type="button"
      onClick={handleMute}
      onMouseOver={() => btnClickOne.play()}
      onFocus={() => {
        console.log('focus');
      }}
      className={areAllSoundsMuted ? 'mute-sound-btn' : ''}
    >
      {areAllSoundsMuted ? 'Unmute All Sounds' : 'Mute All Sounds'}
    </button>
  );
};

export default MuteSoundBtn;
