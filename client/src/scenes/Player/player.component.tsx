import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
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
      console.log(player);
    });
  }, []);

  return (
    <Rect
      x={player.position[0]}
      y={player.position[1]}
      height={player.dimensions[0]}
      width={player.dimensions[1]}
      fill="red"
    />
  );
};

export default Player;
