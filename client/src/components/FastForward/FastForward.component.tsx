import React from 'react';
import './FastForward.styles.css';

const FastForward = (): JSX.Element => {
  return (
    <div className="FastForward__container">
      <div className="nes-container FastForward__box">
        <h1 className="FastForward__text">
          Fast forwarding to present
          <span className="FastForward__dotOne"> .</span>
          <span className="FastForward__dotTwo">.</span>
          <span className="FastForward__dotThree">.</span>
        </h1>
      </div>
    </div>
  );
};

export default FastForward;
