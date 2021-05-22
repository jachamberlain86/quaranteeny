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
  return (
    <div className="sound-bar-container">
      <div className="music-controls">
        <button
          type="button"
          onClick={() => currentSong?.play()}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Play
        </button>
        <button
          type="button"
          onClick={musicController.handleStop}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Stop
        </button>
        <button
          type="button"
          onClick={musicController.handlePause}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Pause
        </button>
        <button
          type="button"
          onClick={musicController.handleMute}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Mute
        </button>
        <button
          type="button"
          onClick={() => musicController.handleVolume(0.05)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Vol +
        </button>
        <button
          type="button"
          onClick={() => musicController.handleVolume(-0.05)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Vol -
        </button>
        <button
          type="button"
          onClick={() => musicController.handleSongSkip(-1)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => musicController.handleSongSkip(1)}
          onMouseOver={() => btnClickOne.play()}
          onFocus={() => {
            console.log('focus');
          }}
        >
          Next
        </button>
      </div>
      <div className="song-title">🎵 {currentSongTitle} </div>
      <MuteSoundBtn />
    </div>
  );
};

export default SoundBar;
