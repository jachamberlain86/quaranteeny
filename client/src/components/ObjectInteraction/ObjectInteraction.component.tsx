import React, { useState, useEffect } from 'react';
import './ObjectInteraction.styles.css';
import { useAppSelector } from '../../app/hooks';

const ObjectInteraction = (): JSX.Element => {
  const { objectsNearBy } = useAppSelector((state) => state.sprite);
  const objectList = objectsNearBy.map((object, index) => {
    const keys = ['K', 'L', 'J'];
    return (
      <li className="key-press-list-item" key={object}>
        <div>Use {object.toUpperCase()}</div>
        <div>
          <span className="key-press">{keys[index]}</span>
        </div>
      </li>
    );
  });
  const interactionIndicator = <div>press K to interact</div>;
  return (
    <div
      className={
        objectList.length > 0
          ? 'object-interaction-container slideInFromLeft'
          : 'slideOutLeft'
      }
    >
      <ul>{objectList && objectList}</ul>
    </div>
  );
};

export default ObjectInteraction;
