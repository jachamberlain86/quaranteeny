import React, { useState } from 'react';
import { Howler } from 'howler';
import { btnClickOne } from '../../audioControllers/buttonSounds';

const MuteSoundBtn = (): JSX.Element => {
  const [isMuted, setIsMuted] = useState(false);
  const handleMute = (): void => {
    btnClickOne.play();
    setIsMuted(!isMuted);
    Howler.mute(isMuted);
  };
  return (
    <button
      type="button"
      onClick={handleMute}
      className={
        isMuted
          ? 'nes-btn mute-sound-btn'
          : 'nes-btn is-disabled mute-sound-btn'
      }
    >
      Mute/Unmute
    </button>
  );
};

export default MuteSoundBtn;
