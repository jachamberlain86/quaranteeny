import React, { useEffect, useRef, useState } from 'react';
import { Rect, Sprite, Group, Layer } from 'react-konva';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectCharacter,
  changeCurPos,
  selectCurPos,
} from '../../features/character/characterSlice';
import { selectClockTimeReal } from '../../features/game/gameSlice';
import {
  selectCurrentInteraction,
  changeInteraction,
} from '../../features/sprite/spriteSlice';
import { imageDirectory, ImageDirectory } from '../../assets/images/index';
import {
  spriteAnimations,
  flatAnimations,
} from '../../data/animationCycles.data';
import game from '../../data/gameMap.data';
import animationFrames from '../../assets/animations/atlas/quarantiny-animation-atlas.png';
import { animationDirectory } from '../../assets/animations/index';
import { generateRandomPos } from '../../helpers/sprite.helper';

const Player = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [imgOptions, setImgOptions] = useState<any | null>({ img: null });

  const { tileSize } = game;
  const scale = tileSize / 32;

  const spriteRef = useRef<any | null>(null);
  const plantRef = useRef<any | null>(null);
  const musicRef = useRef<any | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [idleStart, setIdleStart] = useState<number>(0);
  const [timeNow, setTimeNow] = useState<number>(Date.now());

  const [interaction, setInteraction] = useState<string | null>(null);

  const [currentAnimation, setCurrentAnimation] = useState<string>('idling');
  const [musicAnimation, setMusicAnimation] = useState<string>('blank');

  useEffect(() => {
    const img = new window.Image();
    img.src = animationFrames;
    img.onload = () => {
      setImgOptions({
        img,
      });
    };
    const startPos = generateRandomPos();
    dispatch(changeCurPos(startPos));
    plantRef.current.start();
  }, []);

  const character = useAppSelector(selectCharacter);
  const currentInteraction = useAppSelector(selectCurrentInteraction);

  useEffect(() => {
    setDirection(character.moveDir);
  }, [character.moveDir]);

  useEffect(() => {
    setInteraction(currentInteraction);
    if (currentInteraction === 'cancel') {
      dispatch(changeInteraction('idle'));
    }
  }, [currentInteraction]);

  function checkTime(): void {
    if (idleStart > 0) {
      setTimeout(() => {
        setTimeNow(Date.now());
      }, 1000);
    }
  }

  useEffect(() => {
    const timePassed = Date.now() - idleStart;
    const seconds = timePassed / 1000;
    if (currentAnimation === 'idling') {
      if (seconds >= 5) console.log('I want to move!');
      setIdleStart(0);
    } else if (interaction === 'idle') {
      if (seconds >= 1) setCurrentAnimation('idling');
    }
    checkTime();
  }, [timeNow]);

  useEffect(() => {
    const ref = spriteRef.current;
    console.log(interaction);
    console.log(direction);
    if (interaction === 'cancel') {
      ref.to({
        x: character.curPos.x * tileSize,
        y: (character.curPos.y - 1) * tileSize,
        duration: 0,
      });
      setCurrentAnimation('idling');
    } else if (interaction === 'bath') {
      dispatch(changeCurPos({ x: 17, y: 5 }));
    } else if (interaction === 'phone') {
      dispatch(changeCurPos({ x: 17, y: 15 }));
    } else if (interaction === 'oven') {
      dispatch(changeCurPos({ x: 17, y: 12 }));
    } else if (interaction === 'fridge') {
      dispatch(changeCurPos({ x: 18, y: 12 }));
    } else if (interaction === 'exercise') {
      dispatch(changeCurPos({ x: 12, y: 18 }));
    } else if (interaction === 'table') {
      dispatch(changeCurPos({ x: 13, y: 15 }));
    } else if (interaction === 'bed') {
      dispatch(changeCurPos({ x: 2, y: 4 }));
    } else if (interaction === 'sofa') {
      dispatch(changeCurPos({ x: 6, y: 16 }));
    } else if (interaction === 'desk') {
      dispatch(changeCurPos({ x: 9, y: 13 }));
    } else if (interaction === 'dresser') {
      dispatch(changeCurPos({ x: 6, y: 4 }));
    } else if (interaction === 'basin') {
      dispatch(changeCurPos({ x: 12, y: 4 }));
    } else if (interaction === 'toilet') {
      dispatch(changeCurPos({ x: 14, y: 4 }));
    } else if (interaction === 'lamp') {
      dispatch(changeCurPos({ x: 2, y: 12 }));
    } else if (interaction === 'bookcase') {
      dispatch(changeCurPos({ x: 3, y: 12 }));
    } else if (interaction === 'jukebox') {
      dispatch(changeCurPos({ x: 5, y: 12 }));
    } else if (interaction === 'bin') {
      dispatch(changeCurPos({ x: 11, y: 12 }));
    } else if (interaction === 'sink') {
      dispatch(changeCurPos({ x: 15, y: 12 }));
    } else if (interaction === 'plant') {
      dispatch(changeCurPos({ x: 8, y: 15 }));
    } else if (interaction === 'idle') {
      setIdleStart(Date.now());
      if (direction === 'a') {
        setCurrentAnimation('idlingL');
      } else if (direction === 'w') {
        setCurrentAnimation('idlingU');
      } else if (direction === 'd') {
        setCurrentAnimation('idlingR');
      } else if (direction === 's') {
        setCurrentAnimation('idlingD');
      }
      checkTime();
    } else if (interaction === 'idle') {
      setCurrentAnimation('idling');
    }
    spriteRef.current.start();
  }, [direction, interaction]);

  useEffect(() => {
    const ref = spriteRef.current;

    if (interaction === 'walking') {
      ref.to({
        x: character.curPos.x * tileSize,
        y: (character.curPos.y - 1) * tileSize,
        duration: 0.16,
      });
      if (direction === 'a') setCurrentAnimation('walkingL');
      else if (direction === 'd') setCurrentAnimation('walkingR');
      else if (direction === 'w') setCurrentAnimation('walkingU');
      else if (direction === 's') setCurrentAnimation('walkingD');
    } else if (interaction === 'bath') {
      ref.to({
        x: tileSize * 17,
        y: tileSize * 2,
        duration: 0,
      });
      setCurrentAnimation('bubbles');
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
    } else if (interaction === 'dresser') {
      ref.to({
        x: tileSize * 6,
        y: tileSize * 3,
        duration: 0,
      });
      setCurrentAnimation('interactingU');
      spriteRef.current.start();
    } else if (interaction === 'basin') {
      ref.to({
        x: tileSize * 12,
        y: tileSize * 3,
        duration: 0,
      });
      setCurrentAnimation('interactingU');
      spriteRef.current.start();
    } else if (interaction === 'toilet') {
      ref.to({
        x: tileSize * 14,
        y: tileSize * 3,
        duration: 0,
      });
      setCurrentAnimation('interactingU');
      spriteRef.current.start();
    } else if (interaction === 'lamp') {
      ref.to({
        x: tileSize * 2,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('interactingL');
      spriteRef.current.start();
    } else if (interaction === 'bookcase') {
      ref.to({
        x: tileSize * 3,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('interactingU');
      spriteRef.current.start();
    } else if (interaction === 'jukebox') {
      const nextMusic = musicAnimation === 'music' ? 'blank' : 'music';
      setMusicAnimation(nextMusic);
      ref.to({
        x: tileSize * 5,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('interactingU');
      spriteRef.current.start();
      musicRef.current.start();
    } else if (interaction === 'bin') {
      ref.to({
        x: tileSize * 11,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('interactingU');
      spriteRef.current.start();
    } else if (interaction === 'sink') {
      ref.to({
        x: tileSize * 15,
        y: tileSize * 11,
        duration: 0,
      });
      setCurrentAnimation('interactingU');
      spriteRef.current.start();
    } else if (interaction === 'plant') {
      ref.to({
        x: tileSize * 8,
        y: tileSize * 14,
        duration: 0,
      });
      setCurrentAnimation('interactingL');
      spriteRef.current.start();
    } else {
      ref.to({
        x: character.curPos.x * tileSize,
        y: (character.curPos.y - 1) * tileSize,
        duration: 0,
      });
    }
    spriteRef.current.start();
  }, [character.curPos]);

  return (
    <Layer>
      <Group>
        <Sprite
          ref={musicRef}
          x={5 * tileSize}
          y={10 * tileSize}
          frameRate={4}
          frameIndex={0}
          animation={musicAnimation}
          animations={flatAnimations}
          image={imgOptions.img}
          height={tileSize}
          width={tileSize}
          scale={{ x: scale, y: scale }}
        />
        <Sprite
          ref={plantRef}
          x={7 * tileSize}
          y={14 * tileSize}
          frameRate={1}
          frameIndex={0}
          animation="plant"
          animations={flatAnimations}
          image={imgOptions.img}
          height={tileSize * 2}
          width={tileSize}
          scale={{ x: scale, y: scale }}
        />
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
