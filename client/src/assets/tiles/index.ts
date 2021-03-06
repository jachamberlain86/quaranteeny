import { calcPixelPos, calcPixelSize } from '../../helpers/atlas.helper';
import { AtlasRef } from '../../interfaces/atlasRef.interface';
import { AtlasRefDetails } from '../../interfaces/atlasRefDetails.interface';

import { altImages } from './altImages';
import { bathroom } from './bathroom';
import { bedroom } from './bedroom';
import { diningArea } from './diningArea';
import { floorsWallsDoors } from './floorsWallsDoors';
import { kitchen } from './kitchen';
import { livingArea } from './livingArea';
import { meals } from './meals';
import { office } from './office';
import { untidy } from './untidy';
import { room } from './room';

const blank = [
  {
    key: 'blank',
    x: 8,
    y: 10,
    width: 1,
    height: 1,
  },
];

const images: AtlasRefDetails[] = [
  ...room,
  ...altImages,
  ...bathroom,
  ...bedroom,
  ...diningArea,
  ...floorsWallsDoors,
  ...kitchen,
  ...livingArea,
  ...meals,
  ...office,
  ...untidy,
  ...blank,
];

export class ImageDirectory {
  [key: string]: AtlasRef;

  constructor(imageArr: AtlasRefDetails[]) {
    imageArr.forEach((image: AtlasRefDetails) => {
      const newImage = {
        x: calcPixelPos(image.x),
        y: calcPixelPos(image.y),
        width: image.width,
        height: image.height,
        pixWidth: calcPixelSize(image.width),
        pixHeight: calcPixelSize(image.height),
      };
      this[image.key] = newImage;
    });
  }
}

export const imageDirectory = new ImageDirectory(images);
