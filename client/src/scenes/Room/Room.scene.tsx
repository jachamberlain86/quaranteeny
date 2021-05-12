/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
import { render } from 'react-dom';
import * as ReactKonva from 'react-konva';
import { Stage, Layer, Rect } from 'react-konva';
import React, {
  FC,
  useEffect,
  useState,
  useContext,
  useRef,
  MouseEvent,
} from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import game from '../../data/gameMap.data';
import Player from '../Player/player.component';

import './Room.styles.css';
import Clickables from '../clickables/clickables.component';

const Room: FC = () => {
  const canvasWidth = 800;
  const canvasHeight = 800;
  const { cols, layers, tileSize } = game;

  const [layerA, setLayerA] = useState<any[] | []>([]);

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
        switch (layers[0][yAxis * cols + xAxis]) {
          case 0:
            newArr.push(
              <Rect
                x={xAxis * tileSize}
                y={yAxis * tileSize}
                height={tileSize}
                width={tileSize}
                fill="blue"
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
                fill="pink"
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
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage width={canvasWidth} height={canvasHeight}>
          <Provider store={store}>
            <Layer>{layerA}</Layer>
            <Layer>
              <Player />
            </Layer>
            <Clickables />
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Room;
