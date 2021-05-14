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
      duration: character.delay / 1000,
      fill: character.direction,
    });
    console.log(character);
  }, [character.pixelLocation]);

  return (
    <Rect
      ref={rectRef}
      height={character.dimensions[0]}
      width={character.dimensions[1]}
    />
  );
};

export default Player;
