import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import game from '../../data/gameMap.data';
import {
  triggerProcessMovement,
  triggerSetTimeMoved,
} from '../../helpers/player.helper';

const Player = (): JSX.Element => {
  const { cols, layers, tileSize } = game;
  const player = useAppSelector((store) => store.character);

  const [currentFrameTime, setCurrentFrameTime] = useState(Date.now());
  const [currentSecond, setCurrentSecond] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const [framesLastSecond, setFramesLastSecond] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(0);
  const [moving, setMoving] = useState(false);

  function checkIndex(x: number, y: number): number {
    return y * cols + x;
  }

  // function drawGame(): any {
  //   setCurrentFrameTime(Date.now());

  //   const sec = Math.floor(Date.now());
  //   if (sec !== currentSecond) {
  //     setCurrentSecond(sec);
  //     // setFramesLastSecond(frameCount);
  //     setFrameCount(1);
  //   } else {
  //     setFrameCount(frameCount + 1);
  //   }

  //   if (!player.isMoving) {
  //     let timer: any = null;
  //     if (downKey) {
  //       timer = setInterval(() => {
  //         if (
  //           player?.tileFrom[1] < cols - 1 &&
  //           layers[0][
  //             checkIndex(player.tileFrom[0], player.tileFrom[1] + 1)
  //           ] === 1
  //         ) {
  //           console.log('player moves down');
  //           triggerMove('down');
  //           triggerProcessMovement(currentFrameTime);
  //         }
  //       }, 500);
  //     } else {
  //       clearInterval(timer);
  //     }
  //     if (upKey) {
  //       if (
  //         player?.tileFrom[1] > 0 &&
  //         layers[0][checkIndex(player.tileFrom[0], player.tileFrom[1] - 1)] ===
  //           1
  //       ) {
  //         console.log('player moves up');
  //       }
  //     }
  //   }

  //   if (
  //     player.tileFrom[0] !== player.tileTo[0] ||
  //     player.tileFrom[1] !== player.tileTo[1]
  //   ) {
  //     triggerSetTimeMoved(currentFrameTime);
  //   }
  //   setLastFrameTime(currentFrameTime);
  //   // requestAnimationFrame(drawGame);
  // }

  // useEffect(() => {
  //   drawGame();

  //   console.log(player);
  // }, [player.isMoving, downKey, upKey, leftKey, rightKey]);

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
