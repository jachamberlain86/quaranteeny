/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../../../app/hooks'; 
// import  {store}  from '../../../app/store';
import game from '../../../data/gameMap.data';
import CanvasContext from './canvasContext';
// import {player} from '../../../features/character/characterSlice'

const Map: FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const {cols, layers, tileSize} = game; 
  const [context, setContext] = useState<CanvasRenderingContext2D|null>(null)
  const player = useAppSelector((store) => store.character)
  
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement; 
    setContext(canvas.getContext('2d'))
  }, [context])
  
  
  useEffect(() => {
    if (context) 
    {
      // eslint-disable-next-line no-plusplus
      for (let y = 0; y < cols; y++) {
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < cols; x++) {
          switch(layers[0][(y*cols)+x]){
            case 0: 
            context.fillStyle = "#FF1493"; 
            context.fillRect(x*tileSize, y*tileSize, tileSize, tileSize); 
            break; 
            default: 
            context.fillStyle="#eeeeee"; 
            context.fillRect(x*tileSize, y*tileSize, tileSize, tileSize)
          }
        }
      }

    }
  }, [context, layers, cols, tileSize]);
  
  useEffect(() => {
    if (context) {
      context.fillStyle="#999999"
      context.fillRect(player.position[0], player.position[1],
        player.dimensions[0], player.dimensions[1])
    }
  }, [context, player])
  
  return (
    <CanvasContext.Provider value={context}> 
      <canvas ref={canvasRef} width="400" height="400"/>
    </CanvasContext.Provider>
  )
};

export default Map;