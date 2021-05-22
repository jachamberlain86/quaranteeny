import React from 'react';
import './NewGamePageAnimations.styles.css';

const NewGamePageAnimations = (): JSX.Element => {
  return (
    <div className="new-game-page__animations-bar">
      <div className="new-game-page__sofa-ng-page" />
      <div className="new-game-page__phone-ng-page" />
      <div className="new-game-page__fridge-ng-page" />
      <div className="new-game-page__desk-on-ng-page" />
      <div className="new-game-page__desk-off-ng-page" />
      <div className="new-game-page__plant-ng-page" />
    </div>
  );
};

export default NewGamePageAnimations;
