import { Entities } from '../interfaces/entities.interface';
import { gameMinute, gameHour } from './time.data';

export const entities: Entities = {
  fridge: {
    timeToComplete: gameMinute * 30,
    meterImpacts: [
      { name: 'hunger', amount: 1000 },
      { name: 'money', amount: -50 },
    ],
  },
  bed: {
    timeToComplete: gameHour * 8,
    meterImpacts: [{ name: 'energy', amount: 2000 }],
  },
};
