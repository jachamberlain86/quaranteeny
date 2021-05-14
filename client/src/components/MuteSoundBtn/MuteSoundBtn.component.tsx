import React, { useState } from 'react';
import { Howler } from 'howler';

const MuteSoundBtn = (): JSX.Element => {
  const [isMuted, setIsMuted] = useState(false);
  const handleMute = (): void => {
    setIsMuted(!isMuted);
    Howler.mute(isMuted);
  };
  return (
    <button
      type="button"
      onClick={handleMute}
      className="nes-btn is-disabled mute-sound-btn"
    >
      Mute/Unmute
    </button>
  );
};

export default MuteSoundBtn;
