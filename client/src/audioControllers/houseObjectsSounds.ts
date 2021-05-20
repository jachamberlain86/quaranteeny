import { Howl } from 'howler';
import { musicController } from './musicController';
import sink from '../assets/audio/sound-efx/house-objects/sink-basin.mp3';
import jukebox from '../assets/audio/sound-efx/house-objects/jukebox.mp3';
import windows from '../assets/audio/sound-efx/house-objects/desk.mp3';
import sofa from '../assets/audio/sound-efx/house-objects/sofa-hbo.mp3';
import tvNetflix from '../assets/audio/sound-efx/house-objects/sofa-netflix.mp3';
import lamp from '../assets/audio/sound-efx/house-objects/lamp-switch.mp3';
import bed from '../assets/audio/sound-efx/house-objects/bed-sleep-snoring.mp3';
import fridge from '../assets/audio/sound-efx/house-objects/open-fridge.mp3';
import bath from '../assets/audio/sound-efx/house-objects/run-bath.mp3';
import plant from '../assets/audio/sound-efx/house-objects/water-plant.mp3';
import table from '../assets/audio/sound-efx/house-objects/Its-hopeless-table.mp3';
import telephone from '../assets/audio/sound-efx/house-objects/telephone-ring.mp3';
import exercises from '../assets/audio/sound-efx/house-objects/exercise-situps.mp3';
import toilet from '../assets/audio/sound-efx/house-objects/toilet-peeing-loop.mp3';
import bin from '../assets/audio/sound-efx/house-objects/bin-can.mp3';
import typing from '../assets/audio/sound-efx/house-objects/desk-typing.mp3';
import noise from '../assets/audio/sound-efx/house-objects/jukebox-static.mp3';
import conversation from '../assets/audio/sound-efx/house-objects/phone-russian-talking.mp3';
import movie from '../assets/audio/sound-efx/house-objects/sofa-action-movie.mp3';
import dresser from '../assets/audio/sound-efx/house-objects/dresser-open.mp3';
import eating from '../assets/audio/sound-efx/house-objects/loop-fridge-eating.mp3';
import cooking from '../assets/audio/sound-efx/house-objects/loop-oven-boiling-water.mp3';
// import fart from '../assets/audio/sound-efx/house-objects/wet-fart-one-shot.mp3';
import fart from '../assets/audio/sound-efx/house-objects/onStop-toilet-wet-fart-one-shot.mp3';
import closeTap from '../assets/audio/sound-efx/house-objects/onStop-sink-basin-tap.mp3';
import closeFridge from '../assets/audio/sound-efx/house-objects/onStop-fridge-close.mp3';
import curtainClose from '../assets/audio/sound-efx/house-objects/onStop-bath-curtain.mp3';
import yawn from '../assets/audio/sound-efx/house-objects/onStop-bed-yawn.mp3';
import tvOff from '../assets/audio/sound-efx/house-objects/onStop-sofa-tv-off.mp3';
import hangUpTelephone from '../assets/audio/sound-efx/house-objects/onStop-telephone-hangup.mp3';
import oven from '../assets/audio/sound-efx/house-objects/onStop-oven.mp3';

export const houseInteractablesLoops: string[] = [
  bed,
  bath,
  exercises,
  toilet,
  typing,
  conversation,
  movie,
  sink,
  eating,
  cooking,
];

export const houseInteractablesOneShot: string[] = [
  sofa,
  tvNetflix,
  telephone,
  windows,
  lamp,
  fridge,
  plant,
  table,
  bin,
  noise,
  fart,
  dresser,
];

const houseInteractablesOnStop: string[] = [
  fart,
  closeTap,
  closeFridge,
  curtainClose,
  yawn,
  tvOff,
  hangUpTelephone,
  oven,
];

const fartNoise = new Howl({
  src: [fart],
  volume: 0.05,
});

type howlObject = Record<string, Howl>;

export const houseSoundsLoopsObj = {} as howlObject;
houseInteractablesLoops.forEach((object) => {
  houseSoundsLoopsObj[object] = new Howl({
    src: [object],
    volume: 0.4,
    rate: 1,
    loop: true,
  });
});

export const houseSoundsOneShotObj = {} as howlObject;
houseInteractablesOneShot.forEach((object) => {
  houseSoundsOneShotObj[object] = new Howl({
    src: [object],
    volume: 0.4,
    rate: 1,
    loop: false,
  });
});

export const houseSoundsOnStopObj = {} as howlObject;
houseInteractablesOnStop.forEach((object) => {
  houseSoundsOnStopObj[object] = new Howl({
    src: [object],
    volume: 0.25,
    rate: 1,
    loop: false,
  });
});

export const houseSoundsLoopsArr = Object.entries(houseSoundsLoopsObj);
export const houseSoundsOneShotArr = Object.entries(houseSoundsOneShotObj);
export const houseSoundsOnStopArr = Object.entries(houseSoundsOnStopObj);

export const playObjectSound = (object: string): void => {
  // OneShots
  for (let i = 0; i < houseSoundsOneShotArr.length; i += 1) {
    const soundTitle = houseSoundsOneShotArr[i][0];
    const soundFile = houseSoundsOneShotArr[i][1];
    if (soundTitle.includes(object)) {
      soundFile.play();
    }
  }
  // Loops
  for (let i = 0; i < houseSoundsLoopsArr.length; i += 1) {
    const soundTitle = houseSoundsLoopsArr[i][0];
    const soundFile = houseSoundsLoopsArr[i][1];
    if (soundTitle.includes(object)) {
      soundFile.play();
      soundFile.on('stop', () => {
        for (let j = 0; j < houseSoundsOnStopArr.length; j += 1) {
          const soundTitleOnStop = houseSoundsOnStopArr[j][0];
          const soundFileOnStop = houseSoundsOnStopArr[j][1];
          if (soundTitleOnStop.includes(object)) {
            console.log('onstop match found', soundTitleOnStop);
            soundFileOnStop.play();
          }
        }
      });
    }
  }
};

export const stopObjectSound = (): void => {
  for (let i = 0; i < houseSoundsOneShotArr.length; i += 1) {
    const soundFile = houseSoundsOneShotArr[i][1];
    if (soundFile.playing()) soundFile.stop();
  }
  for (let i = 0; i < houseSoundsLoopsArr.length; i += 1) {
    const soundFile = houseSoundsLoopsArr[i][1];
    if (soundFile.playing()) soundFile.stop();
  }
};
