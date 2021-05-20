import React from 'react';
import './NewGamePageAnimations.styles.css';

const NewGamePageAnimations = (): JSX.Element => {
  return (
    <div className="new-game-page-animations-bar">
      <div className="sofa-ng-page" />
      <div className="phone-ng-page" />
      <div className="fridge-ng-page" />
      <div className="desk-on-ng-page" />
      <div className="desk-off-ng-page" />

      <div className="plant-ng-page" />
    </div>
  );
};

export default NewGamePageAnimations;
