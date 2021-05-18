import { Stage, Layer, Rect } from 'react-konva';
import React, { useEffect, useState, useRef } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import game from '../../data/gameMap.data';
import Player from '../Player/player.component';
import { handleClickTile } from '../../helpers/game.helper';
import { checkIndex } from '../../helpers/input.helper';
import staticImages from '../../assets/tiles/atlas/quarantiny-tile-atlas.png';
import {
  setIsRoomLoadingToFalse,
  setIsRoomLoadingToTrue,
} from '../../features/game/gameSlice';
import { imageDirectory, ImageDirectory } from '../../assets/tiles/index';

import {
  changeCurPos,
  selectCurPos,
} from '../../features/character/characterSlice';
import './Room.styles.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentInteraction } from '../../features/sprite/spriteSlice';

const Room = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { cols, tileSize, layers } = game;
  const canvasWidth = cols * tileSize;
  const canvasHeight = cols * tileSize;
  const scale = tileSize / 32;

  const [roomLayer, setRoomLayer] = useState<JSX.Element[]>([]);
  const [furnitureLayer, setFurnitureLayer] = useState<JSX.Element[]>([]);
  const [topLayer, setTopLayer] = useState<JSX.Element[]>([]);
  const [imageAtlas, setImageAtlas] = useState<HTMLImageElement>();
  const [interaction, setInteraction] = useState<string | null>(null);

  const currentInteraction = useAppSelector(selectCurrentInteraction);

  function updateTileImage(
    tileKey: string,
    tilePos: { x: number; y: number }
  ): JSX.Element {
    const imgRef = imageDirectory[tileKey];
    const newTile = (
      <Rect
        x={tilePos.x * tileSize}
        y={tilePos.y * tileSize}
        key={`${tilePos.x},${tilePos.y}`}
        image={imageAtlas}
        width={tileSize * imgRef.width}
        height={tileSize * imgRef.height}
        fillPatternImage={imageAtlas}
        fillPatternOffset={{
          x: imgRef.x * scale,
          y: imgRef.y * scale,
        }}
        fillPatternScale={{ x: scale, y: scale }}
      />
    );
    return newTile;
  }

  useEffect(() => {
    // setLayer0(renderLayer(0));
    // setLayer2(renderLayer(2));
    dispatch(setIsRoomLoadingToTrue());
    const img = new window.Image();
    setImageAtlas(img);

    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      for (let layer = 0; layer < layers.length; layer += 1) {
        const layerArr: JSX.Element[] = [];
        for (let yAxis = 0; yAxis < cols; yAxis += 1) {
          for (let xAxis = 0; xAxis < cols; xAxis += 1) {
            const tileKey = layers[layer][yAxis * cols + xAxis].key;
            const imgRef = imageDirectory[tileKey];

            if (layer === layers.length - 1) {
              const clickableTile: JSX.Element = (
                <Rect
                  x={xAxis * tileSize}
                  y={yAxis * tileSize}
                  key={`${xAxis}, ${yAxis}`}
                  image={img}
                  width={tileSize * imgRef.width}
                  height={tileSize * imgRef.height}
                  fillPatternImage={img}
                  fillPatternOffset={{
                    x: imgRef.x * scale,
                    y: imgRef.y * scale,
                  }}
                  fillPatternScale={{ x: scale, y: scale }}
                  onClick={handleClickTile}
                />
              );
              layerArr.push(clickableTile);
            } else {
              const tile: JSX.Element = (
                <Rect
                  x={xAxis * tileSize}
                  y={yAxis * tileSize}
                  key={`${xAxis}, ${yAxis}`}
                  image={img}
                  width={tileSize * imgRef.width}
                  height={tileSize * imgRef.height}
                  fillPatternImage={img}
                  fillPatternOffset={{
                    x: imgRef.x * scale,
                    y: imgRef.y * scale,
                  }}
                  fillPatternScale={{ x: scale, y: scale }}
                />
              );
              layerArr.push(tile);
            }
          }
        }
        if (layer === 0) setRoomLayer(layerArr);
        if (layer === 1) setFurnitureLayer(layerArr);
        if (layer === 2) setTopLayer(layerArr);
      }
      dispatch(setIsRoomLoadingToFalse());
    };
    img.src = staticImages;
  }, []);

  useEffect(() => {
    setInteraction(currentInteraction);
  }, [currentInteraction]);

  useEffect(() => {
    const currFurniture = [...furnitureLayer];
    const dresserTile = { x: 6, y: 4 };
    const bathTile = { x: 16, y: 3 };
    const ovenTile = { x: 17, y: 11 };
    const fridgeTile = { x: 18, y: 11 };
    const phoneTile = { x: 18, y: 15 };

    if (interaction === 'idle') {
      const tilePosArr = [dresserTile, bathTile, fridgeTile];
      tilePosArr.forEach((tilePos) => {
        const idx = checkIndex(tilePos.x, tilePos.y);
        currFurniture[idx] = updateTileImage('blank', {
          x: tilePos.x,
          y: tilePos.y,
        });
      });

      const ovenIdx = checkIndex(ovenTile.x, ovenTile.y);
      currFurniture[ovenIdx] = updateTileImage('oven', {
        x: ovenTile.x,
        y: ovenTile.y,
      });
      const phoneIdx = checkIndex(phoneTile.x, phoneTile.y);
      currFurniture[phoneIdx] = updateTileImage('phone', {
        x: phoneTile.x,
        y: phoneTile.y,
      });
    } else if (interaction === 'dresser') {
      const idx = checkIndex(dresserTile.x, dresserTile.y);
      currFurniture[idx] = updateTileImage('dresser-bottom-open', {
        x: dresserTile.x,
        y: dresserTile.y,
      });
    } else if (interaction === 'bath') {
      const idx = checkIndex(bathTile.x, bathTile.y);
      currFurniture[idx] = updateTileImage('bath-bottom-closed', {
        x: bathTile.x,
        y: bathTile.y,
      });
    } else if (interaction === 'phone') {
      const idx = checkIndex(phoneTile.x, phoneTile.y);
      currFurniture[idx] = updateTileImage('phone-on', {
        x: phoneTile.x,
        y: phoneTile.y,
      });
    } else if (interaction === 'oven') {
      const idx = checkIndex(ovenTile.x, ovenTile.y);
      currFurniture[idx] = updateTileImage('oven-on', {
        x: ovenTile.x,
        y: ovenTile.y,
      });
    } else if (interaction === 'fridge') {
      const idx = checkIndex(fridgeTile.x, fridgeTile.y);
      currFurniture[idx] = updateTileImage('fridge-middle-open-full', {
        x: fridgeTile.x,
        y: fridgeTile.y,
      });
    }

    setFurnitureLayer(currFurniture);
  }, [interaction]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage width={canvasWidth} height={canvasHeight}>
          <Provider store={store}>
            <Layer>{roomLayer}</Layer>
            <Layer>{furnitureLayer}</Layer>
            <Player />
            <Layer>{topLayer}</Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Room;
