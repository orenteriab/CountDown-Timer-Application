import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { PureComponent } from 'react';
import './App.css';

library.add(faPlayCircle, faPauseCircle);
dom.watch();

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

/**
 * It takes a formatted-time string (mm:ss) and
 * converts it to seconds.
 * @param {string} formatted
 */
const convertFormattedTimeToRawTime = (formatted) => {
  const [minutes, seconds] = formatted.split(':');
  return (parseInt(minutes) * 60) + parseInt(seconds);
};

const initialState = {
  time: 0,
  run: false,
  basePace: 1000,
  actualPace: 1000,
  proposedTime: '',
  canStart: false,
  started: false,
  speed: 1,
};

class App extends PureComponent {
  constructor() {
    super();
    this.state = initialState;
    this.onCountdownClick = this.onCountdownClick.bind(this);
    this.onSpeedChange = this.onSpeedChange.bind(this);
    this.onCountdownChange = this.onCountdownChange.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
    this.timeout = null;
  }

  /**
   * As divs are
   * @param {boolean} clickable
   */
  onCountdownClick(clickable) {
    return () => {
      if (clickable) {
        const { run } = this.state;
        clearTimeout(this.timeout);
        this.setState(state => ({ ...state, run: !run }));
      }
    };
  }

  /**
   * Handles rhe speed change
   * @param {number} speed
   */
  onSpeedChange(speed) {
    return () => {
      const { basePace } = this.state;
      const actualPace = Math.floor(basePace / speed);
      this.setState(state => ({ ...state, actualPace, speed }));
    };
  }

  /**
   * Handles the input change event.
   * @param {React.SyntheticEvent} evt
   */
  onCountdownChange(evt) {
    if (!this.state.started) {
      const timeFormatRegex = /^\d{2}:[0-5]\d$/;
      const proposedTime = evt.currentTarget.value;
      const canStart = timeFormatRegex.test(proposedTime);
      this.setState(state => ({ ...state, canStart, proposedTime }));
    }
  }

  onStartClick() {
    const { proposedTime } = this.state
    const time = convertFormattedTimeToRawTime(proposedTime);
    this.setState(state => ({
      ...state,
      time,
      run: true,
      started: true,
    }));
  }

  componentDidUpdate() {
    const { time, actualPace, run } = this.state;
    const countdownZero = time === 0;

    if (run && !countdownZero) {
      this.timeout = setTimeout(
        () => this.setState(state => ({ ...state, time: time - 1 })),
        actualPace
      );
    } else if (!countdownZero) {
      this.setState(state => ({ ...state, run: false }));
    } else if (run) {
      this.setState({ ...initialState, time: 'Time\'s up!' });
    }
  }

  isSpeedActive(speed) {
    return this.state.started && this.state.speed === speed ? 'active' : '';
  }

  render() {
    const {
      time,
      run,
      canStart,
      started,
      proposedTime,
    } = this.state;
    const countdownIcon = !run ? 'play-circle' : 'pause-circle';
    const stepControlIcon = ['far', countdownIcon];
    const startButtonEnabled = !canStart || started;
    const countdownValue = started ? '' : proposedTime;
    const timeProgress = time / convertFormattedTimeToRawTime(proposedTime);
    const halfwayLabel = started && (timeProgress <= 0.5) ? 'More than halfway there!' : '';
    const twentySecondsClass = started && (time < 21) ? 'twenty-seconds' : '';
    const blinkyClass = started && (time < 11) ? 'blinky' : '';
    const timesUpClass = isNaN(time) ? 'times-up' : '';
    const timerClass = [twentySecondsClass, blinkyClass, timesUpClass].join(' ').trim();
    const oneXEnabled = this.isSpeedActive(1);
    const oneAndAHalfXEnabled = this.isSpeedActive(1.5);
    const twoXEnabled = this.isSpeedActive(2);

    return (
      <div className="App">
        <div className="time-input-container">
          <span className="countdown-label">Countdown:</span>
          <input
            className="countdown-input"
            type="text"
            placeholder="(Min)"
            onChange={this.onCountdownChange}
            disabled={started}
            value={countdownValue}
          />
          <button className="countdown-button" onClick={this.onStartClick} disabled={startButtonEnabled}>START</button>
        </div>
        <div className="halfway-container">
          <span>{halfwayLabel}</span>
        </div>
        <div className="time-display">
          <span className={timerClass}>{convertRawTime(time)}</span>
          <div className="step-control" onClick={this.onCountdownClick(started)}>
            <FontAwesomeIcon icon={stepControlIcon} />
          </div>
        </div>
        <div className="time-speed-container">
          <button className={oneXEnabled} onClick={this.onSpeedChange(1)} disabled={!run}>1x</button>
          <button className={oneAndAHalfXEnabled} onClick={this.onSpeedChange(1.5)} disabled={!run}>1.5x</button>
          <button className={twoXEnabled} onClick={this.onSpeedChange(2)} disabled={!run}>2x</button>
        </div>
      </div>
    );
  }
}

export default App;
