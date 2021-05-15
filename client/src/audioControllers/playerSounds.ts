import { Howl } from 'howler';
import cuteWalk1 from '../assets/audio/sound-efx/player/cute-walk.mp3';
import shuffleWalk1 from '../assets/audio/sound-efx/player/shuffle-walk.mp3';
import shuffleWalkShort1 from '../assets/audio/sound-efx/player/shuffle-walk-short.mp3';
import collision1 from '../assets/audio/sound-efx/player/collision-1.mp3';
import collision2 from '../assets/audio/sound-efx/player/collision-2.mp3';

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

export const collisionOne = new Howl({
  src: [collision1],
  volume: 0.2,
  loop: false,
  rate: 1.3,
});

export const collisionTwo = new Howl({
  src: [collision2],
  volume: 0.2,
  loop: false,
  rate: 1.3,
});

// Creates an object of multiple sounds that can later be called at random
// used in inputHelper - collision function: handleMove()
type HowlObject = Record<string, Howl>;

export const howlCollisionsObj = {} as HowlObject;
export const collisionArray: string[] = [collision1, collision2];
collisionArray.forEach((sound) => {
  howlCollisionsObj[sound] = new Howl({
    src: [sound],
    volume: 0.2,
    loop: false,
    rate: 1.3,
  });
});
