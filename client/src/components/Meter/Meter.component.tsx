import React, { FC } from 'react';

const Meter: FC = () => {
  return (
    <div>
      <progress className="nes-progress is-primary" value="80" max="100" />
    </div>
  );
};

// value will come in through props and redux
export default Meter;
