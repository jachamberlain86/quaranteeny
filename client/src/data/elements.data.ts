import { Elements } from '../interfaces/elements.interface';

export const elements: Elements = {
  fridge: {
    timeToComplete: 10000,
    meterImpacts: [
      { name: 'food', amount: 10 },
      { name: 'money', amount: -5 },
    ],
  },
  bed: {
    timeToComplete: 10000,
    meterImpacts: [{ name: 'energy', amount: 50 }],
  },
};
