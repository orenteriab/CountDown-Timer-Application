import React from 'react';
import { convertFormattedTimeToRawTime } from './util';

/**
 * This component is responsible for the notification of
 * when the time is past halfway.
 * @typedef {{
 *  time: number,
 *  proposedTime: string,
 *  started: boolean
 * }} Props
 * @param {Props} props
 */
const Halfway = ({ time, proposedTime, started }) => {
  const timeProgress = time / convertFormattedTimeToRawTime(proposedTime);
  const label = started && (timeProgress <= 0.5) ? 'More than halfway there!' : null;
  const labelRendering = label !== null ? (<span>{label}</span>) : null;

  return (
    <div className="halfway-container">
      {labelRendering}
    </div>
  );
};

export default Halfway;