import React from 'react';
import './IntroAnimations.styles.css';

const IntroAnimations = (): JSX.Element => {
  return (
    <div className="intro-animations-bar">
      <div className="intro-animations-bar__lamp-on" />
      <div className="intro-animations-bar__tv-on" />
      <div className="intro-animations-bar__tv-off" />
      <div className="intro-animations-bar__phone-pic" />
      <div className="intro-animations-bar__plant-alive" />
    </div>
  );
};

export default IntroAnimations;
