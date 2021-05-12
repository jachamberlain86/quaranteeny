import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { triggerPlaceAt } from '../../helpers/player.helper';

const keysInterface = {
  ArrowDown: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const Player: FC = () => {
  const [keysObject, setKeysObject] = useState(keysInterface);
  const player = useAppSelector((store) => store.character);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [frameCount, setframeCount] = useState(0);
  const [framesLastSecond, setframesLastSecond] = useState(0);
  const [lastFrameTime, setlastFrameTime] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        triggerPlaceAt(1, 1, 'left');
      }
      if (e.key === 'ArrowUp') {
        console.log('up');
      }
      if (e.key === 'ArrowLeft') {
        console.log('left');
      }
      if (e.key === 'ArrowRight') {
        console.log('right');
      }
    });
  }, []);
  console.log(player);

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
