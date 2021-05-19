import React from 'react';
import './IntroAnimations.styles.css';

const IntroAnimations = (): JSX.Element => {
  return (
    <div className="intro-animations-bar">
      <div className="intro-animations-bar-pic">
        <div className="lamp-buffer" />
        <div className="lamp-on" />
      </div>
      <div className="intro-animations-bar-pic">
        <div className="tv-buffer" />
        <div className="tv-off" />
      </div>
      <div className="intro-animations-bar-pic">
        <div className="phone-buffer" />
        <div className="phone-pic" />
      </div>
      <div className="intro-animations-bar-pic">
        <div className="plant-buffer" />
        <div className="plant-dead" />
      </div>
    </div>
  );
};

export default IntroAnimations;
