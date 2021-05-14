import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { selectCharacter } from '../../features/character/characterSlice';

const Player = (): JSX.Element => {
  const character = useAppSelector(selectCharacter);
  const rectRef = useRef<any | null>(null);

  useEffect(() => {
    const ref = rectRef.current;
    ref.to({
      x: character.pixelLocation[0],
      y: character.pixelLocation[1],
      duration: 0.5,
    });
  }, [character.pixelLocation]);

  return (
    <Rect
      ref={rectRef}
      draggable
      height={character.dimensions[0]}
      width={character.dimensions[1]}
      fill="red"
    />
  );
};

export default Player;
