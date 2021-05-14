import { Howl, Howler } from 'howler';

import btnPress1 from '../assets/audio/sound-efx/buttons/ok-1.mp3';
import btnPress2 from '../assets/audio/sound-efx/buttons/ok-2.mp3';
import btnClick1 from '../assets/audio/sound-efx/buttons/click-1.mp3';
import whoosh1 from '../assets/audio/sound-efx/nav/whoosh.mp3';

export const btnPressOne = new Howl({
  src: [btnPress1],
  autoplay: false,
  volume: 0.5,
});

export const btnPressTwo = new Howl({
  src: [btnPress2],
  autoplay: false,
  volume: 0.5,
});

export const btnClickOne = new Howl({
  src: [btnClick1],
  autoplay: false,
  volume: 0.3,
});

export const whooshOne = new Howl({
  src: [whoosh1],
  autoplay: false,
  volume: 0.1,
  // sprite: {
  //   start: [400, 4000],
  // },
});
