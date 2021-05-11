import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import CanvasContext from './canvasContext';
import { useAppSelector } from '../../app/hooks';

const keysInterface = {
  ArrowDown: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const Player: FC = () => {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [keysObject, setKeysObject] = useState(keysInterface);
  const player = useAppSelector((store) => store.character);
  // const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const ctx = useContext(CanvasContext);

  // useEffect(() => {
  //   const canvas = canvasRef.current as HTMLCanvasElement;
  //   setContext(canvas.getContext('2d'));
  // }, [context]);

  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      console.log(e.key);
    });
  });

  useEffect(() => {
    if (ctx) {
      ctx.fillStyle = '#999999';
      ctx.fillRect(
        player.position[0],
        player.position[1],
        player.dimensions[0],
        player.dimensions[1]
      );
    }
  }, [ctx]);

  return <div />;
};

export default Player;
