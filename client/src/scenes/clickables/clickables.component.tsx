/* eslint-disable no-plusplus */
import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import game from '../../data/gameMap.data';

const Clickables: FC = () => {
  const { cols, layers, tileSize } = game;

  const [layerC, setLayerC] = useState<any[] | []>([]);

  const handleClickYellow = (e: any): void => {
    console.log('clicked this yellow box');
  };
  const handleClickPurple = (e: any): void => {
    console.log('clicked this purple box');
  };
  const handleClickOrange = (e: any): void => {
    console.log('clicked this orange box');
  };

  const makeArray = (): any[] => {
    const newArr = [];
    for (let yAxis = 0; yAxis < cols; yAxis++) {
      for (let xAxis = 0; xAxis < cols; xAxis++) {
        switch (layers[1][yAxis * cols + xAxis]) {
          case 4:
            newArr.push(
              <Rect
                x={xAxis * tileSize}
                y={yAxis * tileSize}
                height={tileSize}
                width={tileSize}
                fill="yellow"
                onClick={handleClickYellow}
              />
            );
            break;
          case 5:
            newArr.push(
              <Rect
                x={xAxis * tileSize}
                y={yAxis * tileSize}
                height={tileSize}
                width={tileSize}
                fill="purple"
                onClick={handleClickPurple}
              />
            );
            break;
          case 6:
            newArr.push(
              <Rect
                x={xAxis * tileSize}
                y={yAxis * tileSize}
                height={tileSize}
                width={tileSize}
                fill="orange"
                onClick={handleClickOrange}
              />
            );
            break;
          default:
            newArr.push(
              <Rect
                x={xAxis * tileSize}
                y={yAxis * tileSize}
                height={tileSize}
                width={tileSize}
              />
            );
        }
      }
    }
    return newArr;
  };

  useEffect(() => {
    setLayerC(makeArray());
  }, []);

  return <Layer>{layerC}</Layer>;
};

export default Clickables;
