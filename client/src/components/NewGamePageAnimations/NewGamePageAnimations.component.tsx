import React from 'react';
import './NewGamePageAnimations.styles.css';

const NewGamePageAnimations = (): JSX.Element => {
  return (
    <div className="new-game-page-animations-bar">
      <div className="sofa-ng-page" />
      <div className="phone-ng-page" />
      <div className="fridge-ng-page" />
      <div className="desk-ng-page" />
      <div className="plant-alive" />
    </div>
  );
};

export default NewGamePageAnimations;
