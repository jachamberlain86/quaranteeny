import React, { FC } from 'react';
import './Furniture.styles.css';

interface FurnitureProps {
  something: string;
}

export default function Furniture(props: {
  something: string;
}): React.ReactElement {
  return (
    <button type="button" className="nes-btn is-primary meter-btn">
      {props.something}
    </button>
  );
}

// export default Button;
