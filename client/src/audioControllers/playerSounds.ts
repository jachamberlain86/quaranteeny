import { Howl } from 'howler';
import cuteWalk1 from '../assets/audio/sound-efx/player/cute-walk.mp3';
import shuffleWalk1 from '../assets/audio/sound-efx/player/shuffle-walk.mp3';
import shuffleWalkShort1 from '../assets/audio/sound-efx/player/shuffle-walk-short.mp3';

export const cuteWalkOne = new Howl({
  src: [cuteWalk1],
  volume: 0.3,
  loop: false,
});

export const shuffleWalkOne = new Howl({
  src: [shuffleWalk1],
  volume: 0.2,
  loop: false,
  rate: 1.3,
});

export const shuffleWalkShort = new Howl({
  src: [shuffleWalkShort1],
  volume: 0.2,
  loop: false,
  rate: 1.3,
});
