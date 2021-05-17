import { Howl } from 'howler';
import track1 from '../assets/audio/tracks/in-game/simon-dark-tune.mp3';
import track2 from '../assets/audio/tracks/in-game/simon-good-morning-tune.mp3';
import track3 from '../assets/audio/tracks/in-game/simon-onra-tune.mp3';
import curiousIntenseSong from '../assets/audio/tracks/in-game/Abstraction - Three Red Hearts - Connected.mp3';
import chillSong from '../assets/audio/tracks/in-game/A Reluctant Hero (LOOP).mp3';
import heartyFellow from '../assets/audio/tracks/in-game/A Hearty Fellow (LOOP).mp3';
import EightiesSlowFunkSong from '../assets/audio/tracks/in-game/Abstraction - Three Red Hearts - Modern Bits.mp3';

import {
  selectCurrentSong,
  selectIsSongMuted,
  selectCurrentSongIndex,
  resetMusic,
  setCurrentSong,
  setIsSongMuted,
  setCurrentSongIndex,
} from '../features/music/musicSlice';
import { store } from '../app/store';

const importArray = [
  track1,
  track2,
  track3,
  curiousIntenseSong,
  chillSong,
  heartyFellow,
  EightiesSlowFunkSong,
];

export type HowlObject = Record<string, Howl>;

export const playListObject = {} as HowlObject;
importArray.forEach((track) => {
  playListObject[track] = new Howl({
    src: [track],
    volume: 0.3,
    rate: 1,
    loop: true,
  });
});

export const playListArr = Object.entries(playListObject);

export const regExp = /(?<=\/static\/media\/)(.*)(?=\.(.*)\.mp3)/g;

// TODO use playlist track listing in drop down menu
// const playList = playListArr.map((song, index) => {
//   return (
//     // eslint-disable-next-line jsx-a11y/no-static-element-interactions
//     <div key={song[0]} onClick={() => song[1].play()}>
//       {song[0].match(regExp)}
//     </div>
//   );
// });

export const findTitleOfCurrentSong = (song: Howl): string | null => {
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

const findHowlFileFromTitle = (title: string): Howl | null => {
  for (let i = 0; i < playListArr.length; i += 1) {
    const howlSong = playListArr[i][1];
    const songPathString = playListArr[i][0];
    if (songPathString.includes(title)) {
      return howlSong;
    }
  }
  return null;
};

let currentSongTypeHowl: Howl;
// const currentSongTypeHowl = playListArr[0][1];
// const currentSongTypeRedux = findTitleOfCurrentSong(currentSongTypeHowl);
// store.dispatch(setCurrentSong(currentSongTypeRedux));
// const getCurrentHowlFile = (): Howl | null => {
//   const songTitle = store.getState().music.currentSong;
//   const howlFile = findHowlFileFromTitle(songTitle);
//   if (howlFile) return howlFile;
//   return null;
// };

export const playSong = (song: Howl): void => {
  song.play();
};

export const stopSong = (song: Howl): void => {
  song.stop();
};

export const handleStop = (): void => {
  const songTitle = store.getState().music.currentSong;
  const howlFile = findHowlFileFromTitle(songTitle);
  if (howlFile) stopSong(howlFile);
};

export const handlePause = (): void => {
  const songTitle = store.getState().music.currentSong;
  const howlFile = findHowlFileFromTitle(songTitle);
  if (howlFile) {
    if (howlFile.playing()) {
      howlFile.pause();
    } else {
      howlFile.play();
    }
  }
};

export const handleMute = (): void => {
  const songTitle = store.getState().music.currentSong;
  const howlFile = findHowlFileFromTitle(songTitle);
  const { isSongMuted } = store.getState().music;
  if (howlFile) {
    if (isSongMuted) {
      store.dispatch(setIsSongMuted(false));
      howlFile.mute(false);
    } else {
      store.dispatch(setIsSongMuted(true));
      howlFile.mute(true);
    }
  }
};

export const handleVolume = (value: number): void => {
  // TODO add indication the max or min has been reached
  const songTitle = store.getState().music.currentSong;
  const howlFile = findHowlFileFromTitle(songTitle);
  if (howlFile) {
    const currentVolume = howlFile.volume();
    const newVolume = currentVolume + value;
    howlFile.volume(newVolume);
  }
};

export const handleSongSkip = (direction: number): void => {
  const songIndex = store.getState().music.currentSongIndex;
  let newIndex = songIndex + direction;
  if (newIndex > playListArr.length - 1) {
    newIndex -= playListArr.length;
  } else if (newIndex < 0) {
    newIndex += playListArr.length;
  }
  store.dispatch(setCurrentSongIndex(newIndex));
  const songTitle = store.getState().music.currentSong;
  const howlFile = findHowlFileFromTitle(songTitle);
  if (howlFile) {
    howlFile.stop();
    const newSong = playListArr[newIndex][1];
    const newSongTitle = findTitleOfCurrentSong(newSong);
    store.dispatch(setCurrentSong(newSongTitle));
    newSong.play();
  }
};

export const musicController = {
  findHowlFileFromTitle,
  findTitleOfCurrentSong,
  playSong,
  stopSong,
  handleStop,
  handlePause,
  handleMute,
  handleVolume,
  handleSongSkip,
};
