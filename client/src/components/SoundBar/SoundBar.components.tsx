/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, createContext } from 'react';
import './SoundBar.styles.css';
import { Howl, Howler } from 'howler';
import { playListObject } from '../../audioControllers/soundBarTracks';

const initialState = {} as Howl;

export const testContext = {
  test: 'does this work',
};

const SoundBar = (): JSX.Element => {
  const [currentSong, setCurrentSong] = useState(initialState);
  const [isSongMuted, setIsSongMuted] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  // regExp (strips static media)(finds songtitle)(strips numbers and extension)
  const regExp = /(?<=\/static\/media\/)(.*)(?=\.(.*)\.mp3)/g;
  const playListArr = Object.entries(playListObject);
  // TODO use playlist track listing in drop down menu
  const playList = playListArr.map((song, index) => {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div key={song[0]} onClick={() => song[1].play()}>
        {song[0].match(regExp)}
      </div>
    );
  });
  const findTitleOfCurrentSong = (song: Howl): string | null => {
    for (let i = 0; i < playListArr.length; i += 1) {
      const howlSong = playListArr[i][1];
      const songPathString = playListArr[i][0];
      if (howlSong === song) {
        const songTitle = songPathString.match(regExp);
        if (songTitle) return songTitle[0];
        return null;
      }
    }
    return null;
  };
  const playSong = (song: Howl): void => {
    song.play();
  };
  const stopSong = (song: Howl): void => {
    song.stop();
  };
  const handleStop = (): void => {
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
  const handleVolume = (value: number): void => {
    // TODO add indication the max or min has been reached
    const currentVolume = currentSong.volume();
    const newVolume = currentVolume + value;
    currentSong.volume(newVolume);
  };
  const handleSongSkip = (direction: number): void => {
    let newIndex = songIndex + direction;
    if (newIndex > playListArr.length - 1) {
      newIndex -= playListArr.length;
    } else if (newIndex < 0) {
      newIndex += playListArr.length;
    }
    setSongIndex(newIndex);
    currentSong.stop();
    const newSong = playListArr[newIndex][1];
    setCurrentSong(newSong);
    newSong.play();
  };
  useEffect(() => {
    playSong(playListArr[songIndex][1]);
    setCurrentSong(playListArr[songIndex][1]);
  }, []);
  return (
    <div className="sound-bar-container">
      {/* {playList} */}
      <div className="music-controls">
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
        <button type="button" onClick={() => handleVolume(0.05)}>
          Vol +
        </button>
        <button type="button" onClick={() => handleVolume(-0.05)}>
          Vol -
        </button>
        <button type="button" onClick={() => handleSongSkip(-1)}>
          Prev
        </button>
        <button type="button" onClick={() => handleSongSkip(1)}>
          Next
        </button>
      </div>
      <div className="song-title">{findTitleOfCurrentSong(currentSong)}</div>
    </div>
  );
};

export default SoundBar;
