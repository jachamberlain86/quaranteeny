import { Howl } from 'howler';
import pop from '../assets/audio/sound-efx/alerts/pop.mp3';

export const bubblePop = new Howl({
  src: [pop],
  autoplay: false,
  loop: false,
  volume: 0.5,
  // onend() {
  //   console.log('Finished!');
  // },
});
