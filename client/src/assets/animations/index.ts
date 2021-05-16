import { calcPixelPos, calcPixelSize } from '../../helpers/atlas.helper';
import { AtlasRef } from '../../interfaces/atlasRef.interface';
import { AnimationRef } from '../../interfaces/animationRef.interfact';

import { sleeping } from './sleeping';
import { watching } from './watching';
import { chatting } from './chatting';
import { eating } from './eating';
import { working } from './working';
import { sitting } from './sitting';
import { idlingD, idlingL, idlingR, idlingU } from './idling';
import { walkingD, walkingL, walkingR, walkingU } from './walking';
import {
  interactingD,
  interactingL,
  interactingR,
  interactingU,
} from './interacting';
import { ring } from './ring';
import { bubbles } from './bubbles';
import { music } from './music';

const blank = [
  {
    key: 'blank',
    x: 19,
    y: 0,
    width: 1,
    height: 1,
  },
];

const animations: AnimationRef[] = [
  {
    name: 'sleeping',
    frames: sleeping,
  },
  {
    name: 'watching',
    frames: watching,
  },
  {
    name: 'chatting',
    frames: chatting,
  },
  {
    name: 'eating',
    frames: eating,
  },
  {
    name: 'working',
    frames: working,
  },
  {
    name: 'sitting',
    frames: sitting,
  },
  {
    name: 'idlingD',
    frames: idlingD,
  },
  {
    name: 'idlingL',
    frames: idlingL,
  },
  {
    name: 'idlingR',
    frames: idlingR,
  },
  {
    name: 'idlingU',
    frames: idlingU,
  },
  {
    name: 'walkingD',
    frames: walkingD,
  },
  {
    name: 'walkingL',
    frames: walkingL,
  },
  {
    name: 'walkingR',
    frames: walkingR,
  },
  {
    name: 'walkingU',
    frames: walkingU,
  },
  {
    name: 'interactingD',
    frames: interactingD,
  },
  {
    name: 'interactingL',
    frames: interactingL,
  },
  {
    name: 'interactingR',
    frames: interactingR,
  },
  {
    name: 'interactingU',
    frames: interactingU,
  },
  {
    name: 'ring',
    frames: ring,
  },
  {
    name: 'bubbles',
    frames: bubbles,
  },
  {
    name: 'music',
    frames: music,
  },
  {
    name: 'blank',
    frames: blank,
  },
];

export class AnimationDirectory {
  [key: string]: AtlasRef[];

  constructor(animationsArr: AnimationRef[]) {
    animationsArr.forEach((animation: AnimationRef) => {
      const framesArr: AtlasRef[] = [];
      animation.frames.forEach((frame) => {
        const newFrame = {
          x: calcPixelPos(frame.x),
          y: calcPixelPos(frame.y),
          width: calcPixelSize(frame.width),
          height: calcPixelSize(frame.height),
        };
        framesArr.push(newFrame);
        this[animation.name] = framesArr;
      });
    });
  }
}

export const animationDirectory = new AnimationDirectory(animations);
