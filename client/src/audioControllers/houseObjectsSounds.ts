import { Howl } from 'howler';
import { musicController } from './musicController';
import sink from '../assets/audio/sound-efx/house-objects/sink-basin.mp3';
import oven from '../assets/audio/sound-efx/house-objects/oven.mp3';
import jukebox from '../assets/audio/sound-efx/house-objects/jukebox.mp3';
import desk from '../assets/audio/sound-efx/house-objects/desk.mp3';
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
import toilet from '../assets/audio/sound-efx/house-objects/toilet-peeing.mp3';
import bin from '../assets/audio/sound-efx/house-objects/bin-can.mp3';

export const houseInteractablesLoops: string[] = [
  desk,
  sofa,
  tvNetflix,
  bed,
  bath,
  telephone,
  exercises,
  toilet,
];

export const houseInteractablesOneShot: string[] = [
  sink,
  oven,
  jukebox,
  lamp,
  fridge,
  plant,
  table,
  bin,
];

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

export const houseSoundsLoopsArr = Object.entries(houseSoundsLoopsObj);
export const houseSoundsOneShotArr = Object.entries(houseSoundsOneShotObj);

export const playObjectSound = (object: string): void => {
  for (let i = 0; i < houseSoundsOneShotArr.length; i += 1) {
    const soundTitle = houseSoundsOneShotArr[i][0];
    const soundFile = houseSoundsOneShotArr[i][1];
    if (soundTitle.includes(object)) {
      soundFile.play();
    }
  }
  for (let i = 0; i < houseSoundsLoopsArr.length; i += 1) {
    const soundTitle = houseSoundsOneShotArr[i][0];
    const soundFile = houseSoundsOneShotArr[i][1];
    if (soundTitle.includes(object)) {
      soundFile.play();
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
