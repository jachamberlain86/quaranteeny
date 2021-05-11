/* eslint-disable no-plusplus */
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Line } from 'react-konva';
import React, { FC, useEffect, useState, useRef, MouseEvent } from 'react';
import game from '../../data/gameMap.data';
import CanvasContext from '../Player/canvasContext';

import './Room.styles.css';

const Room: FC = () => {
  const canvasWidth = 800;
  const canvasHeight = 800;

  const { cols, layers, tileSize } = game;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const [layerA, setLayerA] = useState<typeof Layer | null>(null);
  const [layerB, setLayerB] = useState<typeof Layer | null>(null);
  const [squares, setSquares] = useState<number[][]>(layers);

  // useEffect(() => {
  //   const canvas = canvasRef.current as HTMLCanvasElement;
  //   setContext(canvas.getContext('2d'));
  // }, [context]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClick = (e: any) => {
    console.log('clicked this blue box');
  };

  // const layerA = [];
  // const layerB = [];

  useEffect(() => {
    for (let yAxis = 0; yAxis < cols; yAxis++) {
      for (let xAxis = 0; xAxis < cols; xAxis++) {
        switch (layers[0][yAxis * cols + xAxis]) {
          case 0:
            setLayerA((arr) => [
              ...arr,
              <Rect
                x={xAxis * tileSize}
                y={yAxis * tileSize}
                width={tileSize}
                height={tileSize}
                fill="pink"
              />,
            ]);
            break;
          // case 1:
          //   layerA.push(
          //     <Rect
          //       x={xAxis * tileSize}
          //       y={yAxis * tileSize}
          //       width={tileSize}
          //       height={tileSize}
          //       fill="green"
          //     />
          //   );
          //   break;
          default:
        }

        // switch (layers[1][yAxis * cols + xAxis]) {
        //   case 4:
        //     layerB.push(
        //       <Rect
        //         x={xAxis * tileSize}
        //         y={yAxis * tileSize}
        //         width={tileSize}
        //         height={tileSize}
        //         fill="blue"
        //         onClick={handleClick}
        //       />
        //     );
        //     break;
        //   default:
        // }
      }
    }
  }, [context, layers, cols, tileSize]);

  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Layer>
        {layerA}
        {/* {layerB} */}
      </Layer>
    </Stage>
  );
};
export default Room;
