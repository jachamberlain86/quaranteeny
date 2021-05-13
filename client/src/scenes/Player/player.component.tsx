import React, { useEffect, useState } from 'react';
import { Rect } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { triggerSetTimeMoved } from '../../helpers/player.helper';
import {
  selectMovePos,
  selectCurPos,
  selectCharacter,
} from '../../features/character/characterSlice';
import { store } from '../../app/store';

const Player = (): JSX.Element => {
  const [currentFrameTime, setCurrentFrameTime] = useState(Date.now());
  const [currentSecond, setCurrentSecond] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const [framesLastSecond, setFramesLastSecond] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(0);
  const [moving, setMoving] = useState(false);

  const movePos = useAppSelector(selectMovePos);
  const curPos = useAppSelector(selectCurPos);
  const character = useAppSelector(selectCharacter);

  function drawGame(): any {
    setCurrentFrameTime(Date.now());

    const sec = Math.floor(Date.now());
    if (sec !== currentSecond) {
      setCurrentSecond(sec);
      // setFramesLastSecond(frameCount);
      setFrameCount(1);
    } else {
      setFrameCount(frameCount + 1);
    }

    if (curPos[0] !== movePos[0] || curPos[1] !== movePos[1]) {
      triggerSetTimeMoved(currentFrameTime);
    }
    setLastFrameTime(currentFrameTime);
    // requestAnimationFrame(drawGame);
  }

  useEffect(() => {
    drawGame();
  }, []);

  return (
    <Rect
      x={character.position[0]}
      y={character.position[1]}
      height={character.dimensions[0]}
      width={character.dimensions[1]}
      fill="red"
    />
  );
};

export default Player;
