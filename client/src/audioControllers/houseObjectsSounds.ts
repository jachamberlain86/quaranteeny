import { Howl } from 'howler';
import { musicController } from './musicController';
import sink from '../assets/audio/sound-efx/house-objects/sink-basin.mp3';
import oven from '../assets/audio/sound-efx/house-objects/oven.mp3';
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
import fart from '../assets/audio/sound-efx/house-objects/wet-fart-one-shot.mp3';

export const houseInteractablesLoops: string[] = [
  bed,
  bath,
  exercises,
  toilet,
  typing,
  conversation,
  movie,
];

export const houseInteractablesOneShot: string[] = [
  sofa,
  tvNetflix,
  telephone,
  windows,
  sink,
  oven,
  lamp,
  fridge,
  plant,
  table,
  bin,
  noise,
  fart,
  dresser,
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

export const houseSoundsLoopsArr = Object.entries(houseSoundsLoopsObj);
export const houseSoundsOneShotArr = Object.entries(houseSoundsOneShotObj);

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
    if (soundTitle.includes(object) && object === 'toilet') {
      soundFile.play();
      soundFile.on('stop', () => fartNoise.play());
    } else if (soundTitle.includes(object)) {
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
