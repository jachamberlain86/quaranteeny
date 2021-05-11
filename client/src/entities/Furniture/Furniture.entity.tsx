import React from 'react';
import './Furniture.styles.css';
import {
  handleInteraction,
  setCurrentInteraction,
} from '../../helpers/sprite.helper';

interface FurnitureProps {
  name: string;
}

const Furniture = ({ name }: FurnitureProps): JSX.Element => {
  return (
    <button
      type="button"
      className="nes-btn is-primary meter-btn"
      onClick={() => {
        if (setCurrentInteraction(name)) handleInteraction(name);
      }}
    >
      {name}
    </button>
  );
};

export default Furniture;
