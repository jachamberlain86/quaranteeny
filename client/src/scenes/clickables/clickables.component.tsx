/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Layer, Rect } from 'react-konva';
import Konva from 'konva';
import game from '../../data/gameMap.data';

const Clickables = (): JSX.Element => {
  const { cols, layers, tileSize } = game;

  const [layerC, setLayerC] = useState<JSX.Element[]>([]);

  const handleClickYellow = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    console.log('clicked this yellow box ', e);
  };
  const handleClickPurple = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    console.log('clicked this purple box ', e);
  };
  const handleClickOrange = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    console.log('clicked this orange box ', e);
  };

  const makeArray = (): JSX.Element[] => {
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
