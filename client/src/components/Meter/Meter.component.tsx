import React from 'react';

export default function Meter(): React.ReactElement {
  return (
    <div>
      <progress className="nes-progress is-primary" value="80" max="100" />
    </div>
  );
}

// value will come in through props and redux
