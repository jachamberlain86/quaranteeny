import { Howl } from 'howler';
import sink from '../assets/audio/sound-efx/house-objects/sink.mp3';
import oven from '../assets/audio/sound-efx/house-objects/oven.mp3';
import radio from '../assets/audio/sound-efx/house-objects/radio.mp3';
import computer from '../assets/audio/sound-efx/house-objects/computer.mp3';
import tvHbo from '../assets/audio/sound-efx/house-objects/tv-hbo.mp3';
import tvNetflix from '../assets/audio/sound-efx/house-objects/tv-netflix.mp3';

export const houseInteractables: string[] = [
  sink,
  oven,
  radio,
  computer,
  tvHbo,
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
