import { calcPixelPos, calcPixelSize } from '../../helpers/atlas.helper';
import { AtlasRef } from '../../interfaces/atlasRef.interface';
import { AtlasRefDetails } from '../../interfaces/atlasRefDetails.interface';

const filters: AtlasRefDetails[] = [
  {
    key: 'dusk-dawn-light',
    x: 0,
    y: 0,
    width: 20,
    height: 20,
  },
  {
    key: 'dusk-dawn',
    x: 20,
    y: 0,
    width: 20,
    height: 20,
  },
  {
    key: 'night',
    x: 40,
    y: 0,
    width: 20,
    height: 20,
  },
  {
    key: 'night-tv',
    x: 0,
    y: 20,
    width: 20,
    height: 20,
  },
  {
    key: 'night-computer',
    x: 20,
    y: 20,
    width: 20,
    height: 20,
  },
  {
    key: 'night-light',
    x: 40,
    y: 20,
    width: 20,
    height: 20,
  },
  {
    key: 'day',
    x: 0,
    y: 40,
    width: 20,
    height: 20,
  },
];

export class FilterDirectory {
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

export const filterDirectory = new FilterDirectory(filters);
