/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, createContext } from 'react';
import { Howl, Howler } from 'howler';
import { store } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import './SoundBar.styles.css';
import { musicController } from '../../audioControllers/musicController';

const initialState = {} as Howl;

const SoundBar = (): JSX.Element => {
  const currentSongTitle = useAppSelector((state) => state.music.currentSong);
  const currentSong = musicController.findHowlFileFromTitle(currentSongTitle);
  return (
    <div className="sound-bar-container">
      {/* {playList} */}
      <div className="music-controls">
        <button type="button" onClick={() => currentSong?.play()}>
          Play
        </button>
        <button type="button" onClick={musicController.handleStop}>
          Stop
        </button>
        <button type="button" onClick={musicController.handlePause}>
          Pause
        </button>
        <button type="button" onClick={musicController.handleMute}>
          Mute
        </button>
        <button
          type="button"
          onClick={() => musicController.handleVolume(0.05)}
        >
          Vol +
        </button>
        <button
          type="button"
          onClick={() => musicController.handleVolume(-0.05)}
        >
          Vol -
        </button>
        <button
          type="button"
          onClick={() => musicController.handleSongSkip(-1)}
        >
          Prev
        </button>
        <button type="button" onClick={() => musicController.handleSongSkip(1)}>
          Next
        </button>
      </div>
      <div className="song-title">{currentSongTitle}</div>
    </div>
  );
};

export default SoundBar;
