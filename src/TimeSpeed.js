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
 *  onSpeedChange: (speed: number) => () => void,
 *  run: boolean
 * }} Props
 * @param {Props} props
 */
const TimeSpeed = ({ started, speed, onSpeedChange, run}) => {
  const isOneActive = isSpeedActive(started, speed, 1);
  const isOneAndAHalfActive = isSpeedActive(started, speed, 1.5);
  const isTwoActive = isSpeedActive(started, speed, 2);
  const speedChangeClick = run ? onSpeedChange : Function;

  return (
    <div className="time-speed-container">
      <button className={isOneActive} onClick={speedChangeClick(1)} disabled={!run}>1x</button>
      <button className={isOneAndAHalfActive} onClick={speedChangeClick(1.5)} disabled={!run}>1.5x</button>
      <button className={isTwoActive} onClick={speedChangeClick(2)} disabled={!run}>2x</button>
    </div>
  );
};

export default TimeSpeed;
