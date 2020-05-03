import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertRawTime } from './util';

/**
 * This component is responsible for rendering the remaining
 * time, and stop/pause the countdown.
 * @typedef {{
 *  run: boolean,
 *  started: boolean,
 *  time: number,
 *  onCoundownClick: () => void
 * }} Props
 * @param {Props} props
 */
const TimeDisplay = ({ run, started, time, onCountdownClick }) => {
  const countdownIcon = !run ? 'play-circle' : 'pause-circle';
  const stepControlIcon = ['far', countdownIcon];
  const twentySecondsClass = started && (time < 21) ? 'twenty-seconds' : '';
  const blinkyClass = started && (time < 11) ? 'blinky' : '';
  const timerClass = [twentySecondsClass, blinkyClass].join(' ').trim() || null;
  const stepControlClass = ['step-control', !started ? 'disabled' : ''].join(' ').trim();
  const formattedTime = convertRawTime(time);

  return (
    <div className="time-display">
      <span className={timerClass}>{formattedTime}</span>
      <div className={stepControlClass} onClick={onCountdownClick}>
        <FontAwesomeIcon icon={stepControlIcon} />
      </div>
    </div>
  );
};

export default TimeDisplay;
