import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import CanvasContext from './canvasContext';
import { useAppSelector } from '../../app/hooks';

const keysInterface = {
  ArrowDown: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const Player: FC = () => {
  // const [keysObject, setKeysObject] = useState(keysInterface);
  const player = useAppSelector((store) => store.character);
  // const context = useContext<CanvasRenderingContext2D | null>(CanvasContext);

  useEffect(() => {
    window.addEventListener('keyup', function (e) {
      console.log(e.key);
    });
  }, []);

  // useEffect(() => {
  //   if (context) {
  //     context.fillStyle = '#999999';
  //     context.fillRect(
  //       player.position[0],
  //       player.position[1],
  //       player.dimensions[0],
  //       player.dimensions[1]
  //     );
  //   }
  // }, [context, player]);

  return <Layer>{player}</Layer>;
};

export default Player;
