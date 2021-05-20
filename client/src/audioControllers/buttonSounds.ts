import { Howl, Howler } from 'howler';

import btnPress1 from '../assets/audio/sound-efx/buttons/ok-1.mp3';
import btnPress2 from '../assets/audio/sound-efx/buttons/ok-2.mp3';
import btnClick1 from '../assets/audio/sound-efx/buttons/click-1.mp3';
import whoosh1 from '../assets/audio/sound-efx/nav/whoosh.mp3';
import bleep1Hover from '../assets/audio/sound-efx/buttons/bleep-1-hover.mp3';
import bleep2 from '../assets/audio/sound-efx/buttons/bleep-2.mp3';
import bleep3Success from '../assets/audio/sound-efx/buttons/bleep-3-success.mp3';
import bleep4Computer from '../assets/audio/sound-efx/buttons/bleep-4-computer.mp3';
import bleep5Confirmation from '../assets/audio/sound-efx/buttons/bleep-5-confirmation.mp3';
import bleep6Select from '../assets/audio/sound-efx/buttons/bleep-6-select.mp3';
import bleep7Hover from '../assets/audio/sound-efx/buttons/bleep-7-hover.mp3';
import exitGameBtn from '../assets/audio/sound-efx/buttons/exit-game-press.mp3';
import cancel from '../assets/audio/sound-efx/buttons/cancel-1.mp3';

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
  volume: 0.15,
});

export const whooshOne = new Howl({
  src: [whoosh1],
  autoplay: false,
  volume: 0.1,
  // sprite: {
  //   start: [400, 4000],
  // },
});

export const bleepOneHover = new Howl({
  src: [bleep1Hover],
  autoplay: false,
  volume: 0.3,
});

export const bleepTwo = new Howl({
  src: [bleep2],
  autoplay: false,
  volume: 0.3,
});

export const bleepThreeSuccess = new Howl({
  src: [bleep3Success],
  autoplay: false,
  volume: 0.3,
});

export const bleepFourComputer = new Howl({
  src: [bleep4Computer],
  autoplay: false,
  volume: 0.3,
});

export const bleepFiveConfirmation = new Howl({
  src: [bleep5Confirmation],
  autoplay: false,
  volume: 0.1,
});

export const bleepSixSelect = new Howl({
  src: [bleep6Select],
  autoplay: false,
  volume: 0.3,
});

export const bleepSevenHover = new Howl({
  src: [bleep7Hover],
  autoplay: false,
  volume: 0.3,
});

export const exitGamePress = new Howl({
  src: [exitGameBtn],
  autoplay: false,
  volume: 0.1,
});

export const cancelButton = new Howl({
  src: [cancel],
  autoplay: false,
  volume: 0.4,
});

export const handleBtnHoverEnter = (): void => {
  bleepTwo.play();
};
export const handleBtnHoverLeave = (): void => {
  bleepOneHover.play();
};
