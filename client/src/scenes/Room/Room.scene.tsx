import React, { FC } from 'react';
import './Room.styles.css';
import Sprite from '../../entities/Sprite/Sprite.entity';
import Furniture from '../../entities/Furniture/Furniture.entity';

const Room: FC = () => {
  return (
    <div className="room-container">
      <Furniture name="salad" />
      <Furniture name="takeaway" />
      <Sprite />
      <Furniture name="bed" />
    </div>
  );
};

export default Room;
