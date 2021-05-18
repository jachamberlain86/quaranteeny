import { Stage, Layer, Rect } from 'react-konva';
import React, { useEffect, useState, useRef } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import game from '../../data/gameMap.data';
import Player from '../Player/player.component';
import { handleClickTile } from '../../helpers/game.helper';
import staticImages from '../../assets/tiles/atlas/quarantiny-tile-atlas.png';
import {
  setIsRoomLoadingToFalse,
  setIsRoomLoadingToTrue,
} from '../../features/game/gameSlice';
import { imageDirectory, ImageDirectory } from '../../assets/tiles/index';

import './Room.styles.css';
import { useAppDispatch } from '../../app/hooks';

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
