import { Character } from '../interfaces/character.interface';

const character: Character = {
  curPos: [1, 1],
  movePos: [1, 1],
  dimensions: [40, 40],
  pixelLocation: [45, 45],
  direction: 'left',
  isMoving: false,
  leftFired: false,
  rightFired: false,
  upFired: false,
  downFired: false,
  moveIntId: null,
  moveDir: null,
  delay: 500,
};

export default character;
