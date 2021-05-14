import { Howl } from 'howler';
import GameStatsSong from '../assets/audio/tracks/game-stats/simons-game-stats-music.mp3';

export const gameStatsMusic = new Howl({
  src: [GameStatsSong],
  volume: 0.1,
  loop: true,
});
