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
 * @param {number} rawSeconds
 * @returns {string} A formatted string
 */
export const convertRawTime = (rawSeconds) => {
  if (isNaN(rawSeconds)) return rawSeconds;

  const minutes = Math.floor(rawSeconds / 60);
  const seconds = rawSeconds - (minutes * 60);
  const displayableMinutes = makeTimeUnitDisplayable(minutes);
  const displayableSeconds = makeTimeUnitDisplayable(seconds);
  return `${displayableMinutes}:${displayableSeconds}`;
};

/**
 * It takes a formatted-time string (mm:ss) and
 * converts it to seconds.
 * @param {string} formatted
 * @returns {number} the representation in seconds
 */
export const convertFormattedTimeToRawTime = (formatted) => {
  const [minutes, seconds] = formatted.split(':');
  return (parseInt(minutes) * 60) + parseInt(seconds);
};
