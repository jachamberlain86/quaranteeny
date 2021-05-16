/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import './SoundBar.styles.css';
import { Howl } from 'howler';
import { playListObject } from '../../audioControllers/soundBarTracks';

const initialState = {} as Howl;

const SoundBar = (): JSX.Element => {
  const [currentSong, setCurrentSong] = useState(initialState);
  const [isSongMuted, setIsSongMuted] = useState(false);
  const playListArr = Object.entries(playListObject);
  // const handleClick = (): void => {
  // };
  const playList = playListArr.map((song, index) => {
    const regExp = /(?<=\/static\/media\/)(.*)(?=\.(.*)\.mp3)/g;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div key={song[0]} onClick={() => song[1].play()}>
        {song[0].match(regExp)}
      </div>
    );
  });
  const playSong = (song: Howl): void => {
    song.play();
  };
  const stopSong = (song: Howl): void => {
    song.stop();
  };
  const controlVolume = (value: number, song: Howl): void => {
    song.volume(value);
  };
  // const skipSong = (playlist: string[]): void => {
  //   // playlist.skip();
  // };
  const handleStop = (): void => {
    // find currentSong
    // stop currentSong
    stopSong(currentSong);
  };
  const handlePause = (): void => {
    if (currentSong.playing()) {
      currentSong.pause();
    } else {
      currentSong.play();
    }
  };
  const handleMute = (): void => {
    if (isSongMuted) {
      setIsSongMuted(!isSongMuted);
      currentSong.mute(isSongMuted);
    } else {
      setIsSongMuted(!isSongMuted);
      currentSong.mute(isSongMuted);
    }
  };
  useEffect(() => {
    playSong(playListArr[0][1]);
    setCurrentSong(playListArr[0][1]);
  }, []);
  return (
    <div>
      <h3>im the sound bar</h3>
      {/* {playList} */}
      <button type="button" onClick={() => currentSong.play()}>
        Play
      </button>
      <button type="button" onClick={handleStop}>
        Stop
      </button>
      <button type="button" onClick={handlePause}>
        Pause
      </button>
      <button type="button" onClick={handleMute}>
        Mute
      </button>
    </div>
  );
};

export default SoundBar;
