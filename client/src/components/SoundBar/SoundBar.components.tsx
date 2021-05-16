/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './SoundBar.styles.css';
import { playListObject } from '../../audioControllers/soundBarTracks';

const SoundBar = (): JSX.Element => {
  const playListArr = Object.entries(playListObject);
  // const handleClick = (): void => {
  // };
  const playList = playListArr.map((song, index) => {
    const regExp = /(?<=\/static\/media\/)(.*)(?=\.(.*)\.mp3)/g;
    // const matchArr = song[0].match(
    //   /(?<=\/static\/media\/)(.*)(?=\.(.*)\.mp3)/g
    // );
    // console.log('matchArr', matchArr);
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div key={song[0]} onClick={() => song[1].play()}>
        {song[0].match(regExp)}
      </div>
    );
  });
  // const renderPlaylist = (): JSX.Element => {
  //   return (

  //   );
  // };
  return (
    <div>
      <h3>im the sound bar</h3>
      {playList}
    </div>
  );
};

export default SoundBar;
