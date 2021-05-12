/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
import { render } from 'react-dom';
import * as ReactKonva from 'react-konva';
import { Stage, Layer, Rect, Line, KonvaNodeComponent } from 'react-konva';
import React, {
  FC,
  useEffect,
  useState,
  useContext,
  useRef,
  MouseEvent,
} from 'react';
import game from '../../data/gameMap.data';
// import Player from '../Player/player.component';
// import CanvasContext from '../Player/canvasContext';

import './Room.styles.css';

const Room: FC = () => {
  const canvasWidth = 800;
  const canvasHeight = 800;
  const { cols, layers, tileSize } = game;

  const [layerA, setLayerA] = useState<any[] | []>([]);

  const handleClick = (e: any): void => {
    console.log('clicked this blue box');
  };

  const makeArray = (): any[] => {
    const newArr = [];
    for (let yAxis = 0; yAxis < cols; yAxis++) {
      for (let xAxis = 0; xAxis < cols; xAxis++) {
        switch (layers[0][yAxis * cols + xAxis]) {
          case 0:
            newArr.push(
              <Rect
                x={xAxis * tileSize}
                y={yAxis * tileSize}
                height={tileSize}
                width={tileSize}
                fill="blue"
                onClick={handleClick}
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
                fill="green"
              />
            );
        }
      }
    }
    return newArr;
  };

  useEffect(() => {
    setLayerA(makeArray());
  }, []);

  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Layer>{layerA}</Layer>
    </Stage>
  );
};
export default Room;
