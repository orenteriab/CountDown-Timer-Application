import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import Halfway from './Halfway';
import React, { PureComponent } from 'react';
import TimeDisplay from './TimeDisplay';
import TimeInput from './TimeInput';
import TimeSpeed from './TimeSpeed';
import { convertFormattedTimeToRawTime } from './util';
import './App.css';

library.add(faPlayCircle, faPauseCircle);
dom.watch();

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
   * As divs are clickable on disable, it's needed
   * to manage the countdown event.
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
   * Handles the speed change
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

  render() {
    const { time, run, canStart, started, proposedTime, speed } = this.state;
    const onCountdownClick = this.onCountdownClick(started);

    return (
      <div className="App">
        <TimeInput
          onCountdownChange={this.onCountdownChange}
          started={started}
          proposedTime={proposedTime}
          onStartClick={this.onStartClick} 
          canStart={canStart}
          />
        <Halfway
          time={time}
          proposedTime={proposedTime}
          started={started} />
        <TimeDisplay 
          run={run}
          started={started}
          time={time}
          onCountdownClick={onCountdownClick}
        />
        <TimeSpeed
          started={started}
          speed={speed}
          onSpeedChange={this.onSpeedChange}
          run={run}
        />
      </div>
    );
  }
}

export default App;
