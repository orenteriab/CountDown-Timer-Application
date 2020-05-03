import React from 'react';

/** Regex to validate the time is entered in the right
 * format (mm:ss).
 */
const timeFormatRegex = /^\d{2}:[0-5]\d$/;

/**
 * This component is reponsible for handling the time input.
 * @typedef {{
 *  onCountdownChange: (evt: import('react').SyntheticEvent) => void,
 *  started: boolean,
 *  propsedTime: string,
 *  onStartClick: () => void,
 * }} Props
 * @param {Props} props
 */
const TimeInput = ({ onCountdownChange, started, proposedTime, onStartClick }) => {
  const canStart = timeFormatRegex.test(proposedTime);
  const isButtonDisabled = !canStart || started;
  const countdownValue = started ? '' : proposedTime;

  return (
    <div className="time-input-container">
      <span className="countdown-label">Countdown:</span>
      <input
        className="countdown-input"
        type="text"
        placeholder="(Min)"
        onChange={onCountdownChange}
        disabled={started}
        value={countdownValue}
      />
      <button
        className="countdown-button"
        onClick={onStartClick}
        disabled={isButtonDisabled}>
        START
      </button>
    </div>);
};

export default TimeInput;
