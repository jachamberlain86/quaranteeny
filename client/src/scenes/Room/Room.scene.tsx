import { Stage, Layer, Rect } from 'react-konva';
import React, { useEffect, useState } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import game from '../../data/gameMap.data';
import Player from '../Player/player.component';
import { handleClickTile } from '../../helpers/game.helper';
import { checkIndex } from '../../helpers/input.helper';
import staticImages from '../../assets/tiles/atlas/quarantiny-tile-atlas.png';
import filters from '../../assets/filters/atlas/quarantiny-filter-atlas.png';
import {
  setIsRoomLoadingToFalse,
  setIsRoomLoadingToTrue,
  selectTimeOfDay,
  selectLightOn,
  selectComputerOn,
  selectTvOn,
} from '../../features/game/gameSlice';
import { imageDirectory } from '../../assets/tiles/index';
import { filterDirectory } from '../../assets/filters/index';
import { roomMap } from '../../data/roomMap.data';
import { altTilesMap } from '../../data/altTilesMap.data';

import { selectCurPos } from '../../features/character/characterSlice';
import './Room.styles.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentInteraction } from '../../features/sprite/spriteSlice';

const Room = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { cols, tileSize } = game;

  // sets canvas size based on values given in gameMap
  const canvasWidth = cols * tileSize;
  const canvasHeight = cols * tileSize;
  const scale = tileSize / 32;

  const [roomLayer, setRoomLayer] = useState<JSX.Element[]>([]);
  const [altTilesLayer, setAltTilesLayer] = useState<JSX.Element[]>([]);
  const [filterLayer, setFilterLayer] = useState<JSX.Element[]>([]);
  const [clickableLayer, setClickableLayer] = useState<JSX.Element[]>([]);
  const [imageAtlas, setImageAtlas] = useState<HTMLImageElement>();
  const [filterAtlas, setFilterAtlas] = useState<HTMLImageElement>();
  const [interaction, setInteraction] = useState<string | null>(null);
  const currentInteraction = useAppSelector(selectCurrentInteraction);
  const curPos = useAppSelector(selectCurPos);
  const timeOfDay = useAppSelector(selectTimeOfDay);
  const lightOn = useAppSelector(selectLightOn);
  const computerOn = useAppSelector(selectComputerOn);
  const tvOn = useAppSelector(selectTvOn);

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
        onClick={handleClickTile}
      />
    );
    return newTile;
  }

  function updateFilterImage(tileKey: string): JSX.Element {
    const filter = filterDirectory[tileKey];
    const newTile = (
      <Rect
        x={0}
        y={0}
        key={`${filter.x},${filter.y}`}
        image={filterAtlas}
        width={tileSize * filter.width}
        height={tileSize * filter.height}
        fillPatternImage={filterAtlas}
        fillPatternOffset={{
          x: filter.x * scale,
          y: filter.y * scale,
        }}
        fillPatternScale={{ x: scale, y: scale }}
      />
    );
    return newTile;
  }

  function buildRoomLayer(img: HTMLImageElement): void {
    const layerArr: JSX.Element[] = [];
    for (let yAxis = 0; yAxis < cols; yAxis += 1) {
      for (let xAxis = 0; xAxis < cols; xAxis += 1) {
        const tileKey = roomMap[yAxis * cols + xAxis].key;
        const imgRef = imageDirectory[tileKey];

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
    setRoomLayer(layerArr);
  }

  function buildClickableLayer(): void {
    const layerArr: JSX.Element[] = [];
    for (let yAxis = 0; yAxis < cols; yAxis += 1) {
      for (let xAxis = 0; xAxis < cols; xAxis += 1) {
        const tile: JSX.Element = (
          <Rect
            x={xAxis * tileSize}
            y={yAxis * tileSize}
            key={`${xAxis}, ${yAxis}`}
            width={tileSize}
            height={tileSize}
            onClick={handleClickTile}
          />
        );
        layerArr.push(tile);
      }
    }
    setClickableLayer(layerArr);
  }

  function pickFilter(): string {
    if (timeOfDay === 'dusk' || timeOfDay === 'dawn') {
      if (lightOn) return 'dusk-dawn-light';
      return 'dusk-dawn';
    }
    if (timeOfDay === 'night') {
      if (lightOn) return 'night-light';
      if (tvOn) return 'night-tv';
      if (computerOn) return 'night-computer';
      return 'night';
    }
    if (timeOfDay === 'dawn') return 'dawn';
    return 'day';
  }

  function buildFilterLayer(img: HTMLImageElement): void {
    const filter: string = pickFilter();
    const filterData = filterDirectory[filter];

    const layerArr: JSX.Element[] = [
      <Rect
        x={0}
        y={0}
        key="filter"
        image={img}
        width={tileSize * filterData.width}
        height={tileSize * filterData.height}
        fillPatternImage={img}
        fillPatternOffset={{
          x: filterData.x * scale,
          y: filterData.y * scale,
        }}
        fillPatternScale={{ x: scale, y: scale }}
      />,
    ];

    setFilterLayer(layerArr);
  }

  function buildAltTilesLayer(img: HTMLImageElement): void {
    const layerArr: JSX.Element[] = [];
    for (let yAxis = 0; yAxis < cols; yAxis += 1) {
      for (let xAxis = 0; xAxis < cols; xAxis += 1) {
        const tileKey = altTilesMap[yAxis * cols + xAxis].key;
        const imgRef = imageDirectory[tileKey];

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
    setAltTilesLayer(layerArr);
  }

  useEffect(() => {
    dispatch(setIsRoomLoadingToTrue());
    const img = new window.Image();
    setImageAtlas(img);
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      buildRoomLayer(img);
      buildAltTilesLayer(img);
    };
    img.src = staticImages;
    const filtImg = new window.Image();
    setFilterAtlas(filtImg);
    filtImg.crossOrigin = 'Anonymous';
    filtImg.onload = () => {
      buildFilterLayer(filtImg);
    };
    filtImg.src = filters;
    buildClickableLayer();
    dispatch(setIsRoomLoadingToFalse());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInteraction(currentInteraction);
  }, [currentInteraction]);

  useEffect(() => {
    const lDoorTriggers = [
      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 7, y: 9 },
      { x: 7, y: 10 },
      { x: 7, y: 11 },
      { x: 7, y: 12 },
    ];
    const rDoorTriggers = [
      { x: 12, y: 7 },
      { x: 12, y: 8 },
      { x: 12, y: 9 },
      { x: 12, y: 10 },
      { x: 12, y: 11 },
      { x: 12, y: 12 },
    ];
    let lDoor = false;
    let rDoor = false;
    lDoorTriggers.forEach((tile) => {
      if (tile.x === curPos.x && tile.y === curPos.y) {
        lDoor = true;
      }
    });
    rDoorTriggers.forEach((tile) => {
      if (tile.x === curPos.x && tile.y === curPos.y) {
        rDoor = true;
      }
    });

    const currRoom = [...roomLayer];
    const lIdx = checkIndex(6, 10);
    const rIdx = checkIndex(11, 10);

    if (lDoor) {
      currRoom[lIdx] = updateTileImage('door-open', {
        x: 6,
        y: 10,
      });
    } else if (rDoor) {
      currRoom[rIdx] = updateTileImage('door-open', {
        x: 11,
        y: 10,
      });
    } else {
      currRoom[lIdx] = updateTileImage('door-closed', {
        x: 6,
        y: 10,
      });
      currRoom[rIdx] = updateTileImage('door-closed', {
        x: 11,
        y: 10,
      });
    }
    setRoomLayer(currRoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPos]);

  useEffect(() => {
    const currRoom = [...roomLayer];
    const dresserTile = { x: 6, y: 4 };
    const bathTile = { x: 16, y: 3 };
    const ovenTile = { x: 17, y: 11 };
    const fridgeTile = { x: 18, y: 11 };
    const phoneTile = { x: 18, y: 15 };

    if (interaction === 'idle') {
      const tilePosArr = [dresserTile, bathTile, fridgeTile];
      tilePosArr.forEach((tilePos) => {
        const idx = checkIndex(tilePos.x, tilePos.y);
        currRoom[idx] = updateTileImage('blank', {
          x: tilePos.x,
          y: tilePos.y,
        });
      });

      const ovenIdx = checkIndex(ovenTile.x, ovenTile.y);
      currRoom[ovenIdx] = updateTileImage('oven', {
        x: ovenTile.x,
        y: ovenTile.y,
      });
      const phoneIdx = checkIndex(phoneTile.x, phoneTile.y);
      currRoom[phoneIdx] = updateTileImage('phone', {
        x: phoneTile.x,
        y: phoneTile.y,
      });
    } else if (interaction === 'dresser') {
      const idx = checkIndex(dresserTile.x, dresserTile.y);
      currRoom[idx] = updateTileImage('dresser-bottom-open', {
        x: dresserTile.x,
        y: dresserTile.y,
      });
    } else if (interaction === 'bath') {
      const idx = checkIndex(bathTile.x, bathTile.y);
      currRoom[idx] = updateTileImage('bath-bottom-closed', {
        x: bathTile.x,
        y: bathTile.y,
      });
    } else if (interaction === 'phone') {
      const idx = checkIndex(phoneTile.x, phoneTile.y);
      currRoom[idx] = updateTileImage('phone-on', {
        x: phoneTile.x,
        y: phoneTile.y,
      });
    } else if (interaction === 'oven') {
      const idx = checkIndex(ovenTile.x, ovenTile.y);
      currRoom[idx] = updateTileImage('oven-on', {
        x: ovenTile.x,
        y: ovenTile.y,
      });
    } else if (interaction === 'fridge') {
      const idx = checkIndex(fridgeTile.x, fridgeTile.y);
      currRoom[idx] = updateTileImage('fridge-middle-open-full', {
        x: fridgeTile.x,
        y: fridgeTile.y,
      });
    }

    setRoomLayer(currRoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interaction]);

  useEffect(() => {
    const currFilter = [...filterLayer];
    const filter = pickFilter();
    currFilter[0] = updateFilterImage(filter);
    setFilterLayer(currFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOfDay, lightOn, computerOn, tvOn]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage width={canvasWidth} height={canvasHeight}>
          <Provider store={store}>
            <Layer>{roomLayer}</Layer>
            <Player />
            <Layer>{altTilesLayer}</Layer>
            <Layer>{filterLayer}</Layer>
            <Layer>{clickableLayer}</Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Room;
