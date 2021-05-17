import React, { useEffect, useRef, useState } from 'react';
import { Rect, Sprite, Group, Layer } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { selectCharacter } from '../../features/character/characterSlice';
import { imageDirectory, ImageDirectory } from '../../assets/images/index';
import game from '../../data/gameMap.data';
import spriteAnimations from '../../assets/animations/atlas/quarantiny-animation-atlas.png';
import { animationDirectory } from '../../assets/animations/index';

const Player = (): JSX.Element => {
  const [imgOptions, setImgOptions] = useState<any | null>({ image: null });
  const character = useAppSelector(selectCharacter);
  const spriteRef = useRef<any | null>(null);
  const { tileSize } = game;
  const [
    spriteAnimationDirection,
    setSpriteAnimationDirection,
  ] = useState<string>('walkingUp');

  const { walkingD, walkingU, walkingL, walkingR } = animationDirectory;

  const animations = {
    idle: [
      walkingD[0].x,
      walkingD[0].y,
      walkingD[0].pixWidth,
      walkingD[0].pixHeight,
      walkingD[1].x,
      walkingD[1].y,
      walkingD[1].pixWidth,
      walkingD[1].pixHeight,
    ],
    walkingDown: [
      walkingD[0].x,
      walkingD[0].y,
      walkingD[0].pixWidth,
      walkingD[0].pixHeight,
      walkingD[1].x,
      walkingD[1].y,
      walkingD[1].pixWidth,
      walkingD[1].pixHeight,
    ],
    walkingUp: [
      walkingU[0].x,
      walkingU[0].y,
      walkingU[0].pixWidth,
      walkingU[0].pixHeight,
      walkingU[1].x,
      walkingU[1].y,
      walkingU[1].pixWidth,
      walkingU[1].pixHeight,
    ],
    walkingLeft: [
      walkingL[0].x,
      walkingL[0].y,
      walkingL[0].pixWidth,
      walkingL[0].pixHeight,
      walkingL[1].x,
      walkingL[1].y,
      walkingL[1].pixWidth,
      walkingL[1].pixHeight,
    ],
    walkingRight: [
      walkingR[0].x,
      walkingR[0].y,
      walkingR[0].pixWidth,
      walkingR[0].pixHeight,
      walkingR[1].x,
      walkingR[1].y,
      walkingR[1].pixWidth,
      walkingR[1].pixHeight,
    ],
  };

  useEffect(() => {
    setSpriteAnimationDirection(character.direction);
  }, [character.direction]);
  useEffect(() => {
    const image = new window.Image();
    image.src = spriteAnimations;
    image.onload = () => {
      // set image only when it is loaded
      setImgOptions({
        image,
      });
    };
    const ref = spriteRef.current;
    ref.to({
      x: character.pixelLocation[0],
      y: character.pixelLocation[1] - tileSize / 2,
      duration: character.delay / 1000,
    });
    spriteRef.current.start();
    console.log(character);
  }, [character.pixelLocation]);

  const tileKey = imageDirectory.ofdon;

  // const img = new window.Image();
  // img.src = imageDirectory[tileKey as keyof ImageDirectory];
  // img.crossOrigin = 'Anonymous';

  return (
    <Layer>
      <Group>
        <Sprite
          ref={spriteRef}
          frameRate={7}
          frameIndex={0}
          animation={spriteAnimationDirection}
          animations={animations}
          image={imgOptions.image}
          height={character.dimensions[0] * 2}
          width={character.dimensions[1]}
        />
        {/* <Rect
        ref={spriteRef}
        fill="red"
        height={character.dimensions[0] * 2}
        width={character.dimensions[1]}
        offset={{ x: 0, y: tileSize }}
      /> */}
      </Group>
    </Layer>
  );
  // image={img}
};

export default Player;
