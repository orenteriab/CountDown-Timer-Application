import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * If a number is passed then, format it to show in
 * the display.
 * @param {number} unit
 */
const makeTimeUnitDisplayable = (unit) => {
  return unit > 9 ? String(unit) : `0${unit}`;
};

/**
 * It converts the number of seconds to a formatted
 * `mm:ss` string.
 * @param {number} seconds
 */
const convertRawTime = (rawSeconds) => {
  if (isNaN(rawSeconds)) return rawSeconds;

  const minutes = Math.floor(rawSeconds / 60);
  const seconds = rawSeconds - (minutes * 60);
  const displayableMinutes = makeTimeUnitDisplayable(minutes);
  const displayableSeconds = makeTimeUnitDisplayable(seconds);
  return `${displayableMinutes}:${displayableSeconds}`;
};

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
