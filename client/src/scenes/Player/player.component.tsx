import React, { FC, useEffect, useContext, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import game from '../../data/gameMap.data';
import {
  triggerProcessMovement,
  triggerMove,
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

  // const [currentFrameTime, setCurrentFrameTime] = useState(Date.now());
  // const [currentSecond, setCurrentSecond] = useState(0);
  // const [frameCount, setframeCount] = useState(0);
  // const [framesLastSecond, setframesLastSecond] = useState(0);
  // const [lastFrameTime, setlastFrameTime] = useState(0);
  // const [moving, setMoving] = useState(false);

  const downKey = useKeyPress('ArrowDown');
  const upKey = useKeyPress('ArrowUp');
  const leftKey = useKeyPress('ArrowLeft');
  const rightKey = useKeyPress('ArrowRight');

  function checkIndex(x: number, y: number): number {
    return y * cols + x;
  }
  // triggerProcessMovement(1, 5, Date.now());

  useEffect(() => {
    // something for the animation and draw the game
  });

  useEffect(() => {
    if (downKey) {
      if (
        player?.tileFrom[1] < cols - 1 &&
        layers[0][checkIndex(player.tileFrom[0], player.tileFrom[1] + 1)] === 1
      ) {
        console.log('player moves down');
        triggerMove('down');
        console.log(player);
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
  }, [downKey, upKey, leftKey, rightKey, player]);

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
