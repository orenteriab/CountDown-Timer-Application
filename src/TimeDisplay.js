import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TimeDisplay = ({ timerClass, formattedTime, stepControlClass, onCountdownClick, stepControlIcon }) => {
  return (<div className="time-display">
    <span className={timerClass}>{formattedTime}</span>
    <div className={stepControlClass} onClick={onCountdownClick}>
      <FontAwesomeIcon icon={stepControlIcon} />
    </div>
  </div>);
};

export default TimeDisplay;
