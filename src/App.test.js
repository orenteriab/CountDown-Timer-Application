import App from './App';
import { shallow } from 'enzyme';
import Halfway from './Halfway';
import TimeDisplay from './TimeDisplay';
import TimeInput from './TimeInput';
import TimeSpeed from './TimeSpeed';
import React from 'react';

test('Renders app with state values', () => {
  const rootWrapper = shallow(<App />);
  const appInstance = rootWrapper.instance();
  const {
    time,
    proposedTime,
    started,
    run,
    canStart,
    speed
  } = rootWrapper.state()
  const timeInput = (<TimeInput
    onCountdownChange={appInstance.onCountdownChange}
    started={started}
    proposedTime={proposedTime}
    onStartClick={appInstance.onStartClick} 
    canStart={canStart} />);
  const halfway = (<Halfway
    time={time}
    proposedTime={proposedTime}
    started={started} />);
  const timeDisplay = (<TimeDisplay 
    run={run}
    started={started}
    time={time}
    onCountdownClick={appInstance.onCountdownClick} />);
  const timeSpeed = (<TimeSpeed
    started={started}
    speed={speed}
    onSpeedChange={appInstance.onSpeedChange}
    run={run} />);
  const children = [timeInput, halfway, timeDisplay, timeSpeed];
  expect(rootWrapper.contains(...children)).toEqual(true);
});
