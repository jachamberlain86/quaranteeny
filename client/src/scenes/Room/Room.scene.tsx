import React, { FC } from 'react';
import './Room.styles.css';
import Sprite from '../../entities/Sprite/Sprite.entity';
import Furniture from '../../entities/Furniture/Furniture.entity';

interface FurnitureProps {
  something: string;
}

const Room: FC = (props: FurnitureProps) => {
  return (
    <div className="room-container">
      <Furniture something="Fridge" />
      <Sprite />
      <Furniture something="Bed" />
    </div>
  );
};

export default Room;
// buttons x 2
// sprite
