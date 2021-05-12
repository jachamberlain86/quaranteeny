import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import CanvasContext from './canvasContext';

const keysInterface = {
  ArrowDown: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const Player: FC = () => {
  // const [keysObject, setKeysObject] = useState(keysInterface);
  const player = useAppSelector((store) => store.character);
  const context = useContext<CanvasRenderingContext2D | null>(CanvasContext);

  useEffect(() => {
    window.addEventListener('keyup', function (e) {
      console.log(e.key);
    });
  }, []);

  return <Rect />;
};

export default Player;
