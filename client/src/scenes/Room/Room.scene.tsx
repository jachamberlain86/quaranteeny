import React, { FC } from 'react';
import './Room.styles.css';
import Sprite from '../../entities/Sprite/Sprite.entity';
import Button from '../../entities/Button/Button.entity';

const Room: FC = () => {
  return (
    <div className="room-container">
      <Button />
      <Sprite />
      <Button />
    </div>
  );
};

export default Room;
// buttons x 2
// sprite
