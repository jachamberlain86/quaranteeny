/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './SoundBar.styles.css';
import { musicController } from '../../audioControllers/musicController';
import MuteSoundBtn from '../MuteSoundBtn/MuteSoundBtn.component';
import { btnClickOne } from '../../audioControllers/buttonSounds';

const SoundBar = (): JSX.Element => {
  const currentSongTitle = useAppSelector((state) => state.music.currentSong);
  const currentSong = musicController.findHowlFileFromTitle(currentSongTitle);
  const titleToDisplay = currentSongTitle.split('media/')[1];
  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>): void => {
    e.target.classList.add('sound-bar__btn--focus');
  };
  return (
    <div className="sound-bar__container">
      <div className="sound-bar__music-controls">
        <button
          type="button"
          onClick={() => {
            if (currentSong) musicController.playSong(currentSong);
          }}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Play
        </button>
        <button
          type="button"
          onClick={musicController.handleStop}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Stop
        </button>
        <button
          type="button"
          onClick={musicController.handlePause}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Pause
        </button>
        <button
          type="button"
          onClick={musicController.handleMute}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Mute
        </button>
        <button
          type="button"
          onClick={() => musicController.handleVolume(0.05)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Vol +
        </button>
        <button
          type="button"
          onClick={() => musicController.handleVolume(-0.05)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Vol -
        </button>
        <button
          type="button"
          onClick={() => musicController.handleSongSkip(-1)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => musicController.handleSongSkip(1)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => handleFocus}
        >
          Next
        </button>
      </div>
      <div className="sound-bar__song-title">🎵 {titleToDisplay} </div>
      <MuteSoundBtn />
    </div>
  );
};

export default SoundBar;
