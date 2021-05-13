import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import game from '../../data/gameMap.data';
import {
  triggerProcessMovement,
  triggerMove,
  triggerSetTimeMoved,
} from '../../helpers/player.helper';

function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  function downHandler({ key }: { key: any }): void {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  function upHandler({ key }: { key: any }): void {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
  return keyPressed;
}

const Player: FC = () => {
  const { cols, layers, tileSize } = game;
  const player = useAppSelector((store) => store.character);

  const [currentFrameTime, setCurrentFrameTime] = useState(Date.now());
  const [currentSecond, setCurrentSecond] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const [framesLastSecond, setFramesLastSecond] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(0);
  const [moving, setMoving] = useState(false);

  const downKey = useKeyPress('ArrowDown');
  const upKey = useKeyPress('ArrowUp');
  const leftKey = useKeyPress('ArrowLeft');
  const rightKey = useKeyPress('ArrowRight');

  function checkIndex(x: number, y: number): number {
    return y * cols + x;
  }

  function drawGame(): any {
    setCurrentFrameTime(Date.now());

    const sec = Math.floor(Date.now());
    if (sec !== currentSecond) {
      setCurrentSecond(sec);
      setFramesLastSecond(frameCount);
      setFrameCount(1);
    } else {
      setFrameCount(frameCount + 1);
    }
    // if (player) {
    if (downKey) {
      if (
        player?.tileFrom[1] < cols - 1 &&
        layers[0][checkIndex(player.tileFrom[0], player.tileFrom[1] + 1)] === 1
      ) {
        console.log('player moves down');
        triggerMove('down');
        triggerProcessMovement(currentFrameTime);
        // console.log(player);
      }
    }
    if (upKey) {
      if (
        player?.tileFrom[1] > 0 &&
        layers[0][checkIndex(player.tileFrom[0], player.tileFrom[1] - 1)] === 1
      ) {
        console.log('player moves up');
      }
    }

    if (
      player.tileFrom[0] !== player.tileTo[0] ||
      player.tileFrom[1] !== player.tileTo[1]
    ) {
      triggerSetTimeMoved(currentFrameTime);
    }
    // }
    setLastFrameTime(currentFrameTime);
  }

  // useEffect(() => {
  //   requestAnimationFrame(drawGame);
  // }, [player]);

  useEffect(() => {
    if (player.isMoving) {
      requestAnimationFrame(drawGame);
    }
    drawGame();
    console.log(player);
  }, [player.isMoving, downKey, upKey, leftKey, rightKey, player.tileTo]);

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
