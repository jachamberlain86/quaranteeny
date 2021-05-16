import { Howl } from 'howler';
import sink from '../assets/audio/sound-efx/house-objects/sink-basin.mp3';
import oven from '../assets/audio/sound-efx/house-objects/oven.mp3';
import jukebox from '../assets/audio/sound-efx/house-objects/jukebox.mp3';
import desk from '../assets/audio/sound-efx/house-objects/desk.mp3';
import sofa from '../assets/audio/sound-efx/house-objects/sofa-hbo.mp3';
import tvNetflix from '../assets/audio/sound-efx/house-objects/tv-netflix.mp3';

export const houseInteractables: string[] = [
  sink,
  oven,
  jukebox,
  desk,
  // should be tvHbo but the TV is activated with the word 'sofa'
  sofa,
  tvNetflix,
];

type howlObject = Record<string, Howl>;

export const houseInteractablesObj = {} as howlObject;
houseInteractables.forEach((object) => {
  houseInteractablesObj[object] = new Howl({
    src: [object],
    volume: 0.2,
    rate: 1,
    loop: false,
  });
});
