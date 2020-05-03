import React from 'react';

const TimeInput = ({ onCountdownChange, started, countdownValue, onStartClick, startButtonEnabled }) => {
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
        disabled={startButtonEnabled}>
        START
      </button>
    </div>);
};

export default TimeInput;
