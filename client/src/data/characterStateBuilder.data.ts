import { generateRandomPos } from '../helpers/sprite.helper';

export class CharacterStateBuilder {
  randomPos: { x: number; y: number };

  constructor() {
    this.randomPos = generateRandomPos(false);
  }
}

export const characterStateBuilder = new CharacterStateBuilder();
