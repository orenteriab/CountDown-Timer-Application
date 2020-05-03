import React from 'react';

/**
 * Verifies it the speed of the button is the one
 * active.
 * @typedef {(1 | 1.5 | 2)} Speed
 * @param {boolean} started
 * @param {Speed} speed
 * @param {Speed} comparingSpeed
 */
const isSpeedActive = (started, speed, comparingSpeed) => {
  return started && speed === comparingSpeed ? 'active' : null;
}

/**
 * This component is responsible for rendering the
 * speed control on the countdown.
 * @typedef {{
 *  started: boolean,
 *  speed: (1 | 1.5 | 2),
 *  onSpeedChange: () => void,
 *  run: boolean
 * }} Props
 * @param {Props} props
 */
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
