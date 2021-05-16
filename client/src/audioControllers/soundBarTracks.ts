import { Howl } from 'howler';
import track1 from '../assets/audio/tracks/in-game/simon-dark-tune.mp3';
import track2 from '../assets/audio/tracks/in-game/simon-good-morning-tune.mp3';
import track3 from '../assets/audio/tracks/in-game/simon-onra-tune.mp3';
import curiousIntenseSong from '../assets/audio/tracks/in-game/Abstraction - Three Red Hearts - Connected.mp3';
import chillSong from '../assets/audio/tracks/in-game/A Reluctant Hero (LOOP).mp3';
import heartyFellow from '../assets/audio/tracks/in-game/A Hearty Fellow (LOOP).mp3';
import EightiesSlowFunkSong from '../assets/audio/tracks/in-game/Abstraction - Three Red Hearts - Modern Bits.mp3';

const playListArray = [
  track1,
  track2,
  track3,
  curiousIntenseSong,
  chillSong,
  heartyFellow,
  EightiesSlowFunkSong,
];

type HowlObject = Record<string, Howl>;

export const playListObject = {} as HowlObject;
playListArray.forEach((track) => {
  playListObject[track] = new Howl({
    src: [track],
    volume: 0.3,
    rate: 1,
    loop: true,
  });
});
