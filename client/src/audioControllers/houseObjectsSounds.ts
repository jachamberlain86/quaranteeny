import { Howl } from 'howler';
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

export const houseInteractables: string[] = [
  sink,
  oven,
  jukebox,
  desk,
  // should be tvHbo but the TV is activated with the word 'sofa'
  sofa,
  tvNetflix,
  lamp,
  bed,
  fridge,
  bath,
  plant,
  table,
  telephone,
  exercises,
  toilet,
  bin,
];

type howlObject = Record<string, Howl>;

export const houseInteractablesObj = {} as howlObject;
houseInteractables.forEach((object) => {
  houseInteractablesObj[object] = new Howl({
    src: [object],
    volume: 0.4,
    rate: 1,
    loop: false,
  });
});

export const houseSoundsArray = Object.entries(houseInteractablesObj);

export const playObjectSound = (object: string): void => {
  console.log('incoming sound string: ', object);
  for (let i = 0; i < houseSoundsArray.length; i += 1) {
    const soundFile = houseSoundsArray[i];
    if (soundFile[0].includes(object)) {
      soundFile[1].play();
    }
  }
};
