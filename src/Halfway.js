import React from 'react';

const Halfway = ({ time, proposedTime, started }) => {
  const timeProgress = time / proposedTime;
  const label = started && (timeProgress <= 0.5) ? 'More than halfway there!' : null;
  const labelRendering = label !== null ? <span>{label}</span> : null;

  return (
    <div className="halfway-container">
      {labelRendering}
    </div>
  );
};

export default Halfway;