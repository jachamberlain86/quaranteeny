import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { triggerPlaceAt } from '../../helpers/player.helper';

const Player: FC = () => {
  const player = useAppSelector((store) => store.character);

  const [currentFrameTime, setCurrentFrameTime] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [frameCount, setframeCount] = useState(0);
  const [framesLastSecond, setframesLastSecond] = useState(0);
  const [lastFrameTime, setlastFrameTime] = useState(0);
  const [moving, setMoving] = useState(false);

    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        triggerPlaceAt(1, 1, 'left');
  const downKey = useKeyPress('ArrowDown');
  const leftKey = useKeyPress('ArrowLeft');
  const rightKey = useKeyPress('ArrowRight');

  function checkIndex(x: number, y: number): number {
    return y * cols + x;
  }

  function drawGame(): any {
    setCurrentFrameTime(Date.now());

    const sec = Math.floor(Date.now() / 1000);
    if (sec !== currentSecond) {
      setCurrentSecond(sec);
      setFramesLastSecond(frameCount);
      setFrameCount(1);
    } else {
      setFrameCount(frameCount + 1);
    }

    if (!player.isMoving) {
      const timer: any = null;
      if (downKey === true) {
        // timer = setInterval(() => {
        if (
          player?.tileFrom[1] < cols - 1 &&
          layers[0][checkIndex(player.tileFrom[0], player.tileFrom[1] + 1)] ===
            1
        ) {
          console.log('player moves down');
          console.log(downKey);
          triggerMove('down');
          // triggerProcessMovement(currentSecond);
        }
        // }, 500);
        // } else {
        //   clearInterval(timer);
      }
      if (e.key === 'ArrowUp') {
      }
      if (e.key === 'ArrowLeft') {
        console.log('left');
      }
      if (e.key === 'ArrowRight') {
        console.log('right');
      }
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
