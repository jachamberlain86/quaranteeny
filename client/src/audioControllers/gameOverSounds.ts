import { Howl } from 'howler';
import gameOver1 from '../assets/audio/sound-efx/game-over/game-over-one.mp3';
import gameOver2 from '../assets/audio/sound-efx/game-over/game-over-two.mp3';
import gameOver3 from '../assets/audio/sound-efx/game-over/game-over-three.mp3';
import gameOver4 from '../assets/audio/sound-efx/game-over/game-over-four.mp3';
import bleepGameOver from '../assets/audio/sound-efx/buttons/bleep-7-hover.mp3';

const volumeLevels = 0.15;

export const gameOverOne = new Howl({
  src: [gameOver1],
  volume: volumeLevels,
});

export const gameOverTwo = new Howl({
  src: [gameOver2],
  volume: volumeLevels,
});

export const gameOverThree = new Howl({
  src: [gameOver3],
  volume: volumeLevels,
});

export const gameOverFour = new Howl({
  src: [gameOver4],
  volume: volumeLevels,
});

export const bleepingGameOver = new Howl({
  src: [bleepGameOver],
  autoplay: false,
  volume: 0.05,
  loop: true,
  rate: 1.2,
});
