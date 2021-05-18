import React from 'react';
import './Loading.styles.css';

const Loading = (): JSX.Element => {
  return (
    <div className="Loading__container">
      <div className="nes-container Loading__box">
        <h1 className="Loading__text">
          Loading
          <span className="Loading__dotOne"> .</span>
          <span className="Loading__dotTwo">.</span>
          <span className="Loading__dotThree">.</span>
        </h1>
      </div>
    </div>
  );
};

export default Loading;
