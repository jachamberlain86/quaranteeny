import { Howl } from 'howler';
import gameOverSong from '../assets/audio/tracks/game-over/In Dire Need (LOOP).mp3';

export const gameOverMusic = new Howl({
  src: [gameOverSong],
  volume: 0.1,
  rate: 1,
  loop: true,
});
