import React, { useState } from 'react';
import { Howler } from 'howler';
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
      className={areAllSoundsMuted ? 'mute-sound-btn' : ''}
    >
      Mute/Unmute
    </button>
  );
};

export default MuteSoundBtn;
