import React, { useEffect, useRef, useState } from 'react';
import { Rect, Sprite, Group, Layer } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { selectCharacter } from '../../features/character/characterSlice';
import { selectCurrentInteraction } from '../../features/sprite/spriteSlice';
import { imageDirectory, ImageDirectory } from '../../assets/images/index';
import { spriteAnimations } from '../../data/animationCycles.data';
import game from '../../data/gameMap.data';
import animationFrames from '../../assets/animations/atlas/quarantiny-animation-atlas.png';
import { animationDirectory } from '../../assets/animations/index';

const Player = (): JSX.Element => {
  const [imgOptions, setImgOptions] = useState<any | null>({ img: null });

  const character = useAppSelector(selectCharacter);
  const currentInteraction = useAppSelector(selectCurrentInteraction);
  const { tileSize } = game;
  const scale = tileSize / 32;

  const spriteRef = useRef<any | null>(null);
  const [direction, setDirection] = useState<string | null>(null);

  const [interaction, setInteraction] = useState<string | null>(null);

  const [currentAnimation, setCurrentAnimation] = useState<string>('idling');

  useEffect(() => {
    setDirection(character.moveDir);
  }, [character.moveDir]);

  useEffect(() => {
    setInteraction(currentInteraction);
  }, [currentInteraction]);

  useEffect(() => {
    const ref = spriteRef.current;
    if (interaction === 'bath') {
      ref.to({
        x: tileSize * 17,
        y: tileSize * 2,
        duration: 0,
      });
      setCurrentAnimation('bubbles');
      spriteRef.current.start();
    } else if (interaction === 'phone') {
      ref.to({
        x: tileSize * 17,
        y: tileSize * 14,
        duration: 0,
      });
      setCurrentAnimation('chatting');
      spriteRef.current.start();
    } else if (interaction === 'oven') {
      ref.to({
        x: tileSize * 17,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('eating');
      spriteRef.current.start();
    } else if (interaction === 'fridge') {
      ref.to({
        x: tileSize * 18,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('eating');
      spriteRef.current.start();
    } else if (interaction === 'exercise') {
      ref.to({
        x: tileSize * 11,
        y: tileSize * 17,
        duration: 0,
      });
      setCurrentAnimation('exercising');
      spriteRef.current.start();
    } else if (interaction === 'table') {
      ref.to({
        x: tileSize * 13,
        y: tileSize * 13,
        duration: 0,
      });
      setCurrentAnimation('sitting');
      spriteRef.current.start();
    } else if (interaction === 'bed') {
      ref.to({
        x: tileSize * 2,
        y: tileSize * 3,
        duration: 0,
      });
      setCurrentAnimation('sleeping');
      spriteRef.current.start();
    } else if (interaction === 'sofa') {
      ref.to({
        x: tileSize * 4,
        y: tileSize * 14,
        duration: 0,
      });
      setCurrentAnimation('watching');
      spriteRef.current.start();
    } else if (interaction === 'desk') {
      ref.to({
        x: tileSize * 9,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('working');
      spriteRef.current.start();
    } else if (interaction === 'idle') setCurrentAnimation('idling');
    else if (interaction === 'walking' && direction === 'a')
      setCurrentAnimation('walkingL');
    else if (interaction === 'walking' && direction === 'd')
      setCurrentAnimation('walkingR');
    else if (interaction === 'walking' && direction === 'w')
      setCurrentAnimation('walkingU');
    else if (interaction === 'walking' && direction === 's')
      setCurrentAnimation('walkingD');
    else if (interaction !== null && direction === 'a')
      setCurrentAnimation('interactingL');
    else if (interaction !== null && direction === 'd')
      setCurrentAnimation('interactingR');
    else if (interaction !== null && direction === 's')
      setCurrentAnimation('interactingD');
    else if (interaction !== null && direction === 'w')
      setCurrentAnimation('interactingU');
  }, [direction, interaction]);

  useEffect(() => {
    const img = new window.Image();
    img.src = animationFrames;
    img.onload = () => {
      setImgOptions({
        img,
      });
    };
  }, []);

  useEffect(() => {
    const ref = spriteRef.current;
    ref.to({
      x: character.curPos[0] * tileSize,
      y: (character.curPos[1] - 1) * tileSize,
      duration: 0.16,
    });
    spriteRef.current.start();
  }, [character.curPos]);

  return (
    <Layer>
      <Group>
        <Sprite
          ref={spriteRef}
          frameRate={7}
          frameIndex={0}
          animation={currentAnimation}
          animations={spriteAnimations}
          image={imgOptions.img}
          height={tileSize * 2}
          width={tileSize}
          scale={{ x: scale, y: scale }}
        />
      </Group>
    </Layer>
  );
};

export default Player;
