import React from 'react';

/**
 * Verifies it the speed of the button is the one
 * active.
 * @param {(1 | 1.5 | 2)} speed
 */
const isSpeedActive = (started, speed, comparingSpeed) => {
  return started && speed === comparingSpeed ? 'active' : null;
}

const TimeSpeed = ({ started, speed, onSpeedChange, run}) => {
  const isOneActive = isSpeedActive(started, speed, 1);
  const isOneAndAHalfActive = isSpeedActive(started, speed, 1.5);
  const isTwoActive = isSpeedActive(started, speed, 2);

  return (
    <div className="time-speed-container">
      <button className={isOneActive} onClick={onSpeedChange(1)} disabled={!run}>1x</button>
      <button className={isOneAndAHalfActive} onClick={onSpeedChange(1.5)} disabled={!run}>1.5x</button>
      <button className={isTwoActive} onClick={onSpeedChange(2)} disabled={!run}>2x</button>
    </div>
  );
};

export default TimeSpeed;
