import React from 'react';
import './IntroAnimations.styles.css';

const IntroAnimations = (): JSX.Element => {
  return (
    <div className="intro-animations-bar">
      <div className="lamp-on" />
      <div className="tv-off" />
      <div className="phone-pic" />
      <div className="plant-alive" />
    </div>
  );
};

export default IntroAnimations;
