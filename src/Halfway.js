import React from 'react';

const Halfway = ({ label = null }) => {
  const labelRendering = label !== null ? <span>{label}</span> : null;
  return (
    <div className="halfway-container">
      {labelRendering}
    </div>
  );
};

export default Halfway;