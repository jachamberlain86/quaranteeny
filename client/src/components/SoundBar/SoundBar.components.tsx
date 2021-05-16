/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import './SoundBar.styles.css';
import { Howl, Howler } from 'howler';
import { playListObject } from '../../audioControllers/soundBarTracks';

const initialState = {} as Howl;

const SoundBar = (): JSX.Element => {
  const [currentSong, setCurrentSong] = useState(initialState);
  const [isSongMuted, setIsSongMuted] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  console.log('songIndex', songIndex);
  console.log('currentSong', currentSong);
  const playListArr = Object.entries(playListObject);
  // TODO use playlist track listing in drop down menu
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
  );
};

export default SoundBar;
