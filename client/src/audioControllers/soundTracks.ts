import { Howl, Howler } from 'howler';
import curiousIntenseSong from '../assets/audio/tracks/in-game/Abstraction - Three Red Hearts - Connected.mp3';
import chillSong from '../assets/audio/tracks/in-game/A Reluctant Hero (LOOP).mp3';
import EightiesSlowFunkSong from '../assets/audio/tracks/in-game/Abstraction - Three Red Hearts - Modern Bits.mp3';

export const musicCuriousIntense = new Howl({
  src: [curiousIntenseSong],
  autoplay: false,
  loop: true,
  volume: 0.1,
  // onend() {
  //   console.log('Finished!');
  // },
});

export const musicEightiesSlowFunk = new Howl({
  src: [EightiesSlowFunkSong],
  autoplay: false,
  loop: true,
  volume: 0.1,
  // onend() {
  //   console.log('Finished!');
  // },
});

export const musicChillSong = new Howl({
  src: [chillSong],
  autoplay: false,
  loop: true,
  volume: 0.1,
  // onend() {
  //   console.log('Finished!');
  // },
});

// const playListArray = [soundTrack1, chillSong, soundTrack3];
