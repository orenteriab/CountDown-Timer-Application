import { shallow } from 'enzyme';
import React from 'react';
import TimeDisplay from './TimeDisplay';

const onCountDownClick = jest.fn();

test('Regular', () => {
  const wrapper = shallow(<TimeDisplay onCountdownClick={onCountDownClick} run={true} started={true} time={21} />);
  const timeDisplay = wrapper.find('div.time-display > span');
  const { className } = timeDisplay.props();
  expect(className).toBeNull()
});

describe('Time style changes', () => {
  const testBuilder = (time, selector) => {
    const wrapper = shallow(<TimeDisplay onCountdownClick={onCountDownClick} run={true} started={true} time={time} />);
    const timeDisplay = wrapper.find(selector);
    expect(timeDisplay.exists()).toBe(true);
  };

  test('20 seconds', () => {
    testBuilder(20, 'div.time-display > span.twenty-seconds');
  });

  test('10 seconds', () => {
    testBuilder(10, 'div.time-display > span.twenty-seconds.blinky');
  });
});

describe('Countdown control', () => {
  const testBuilder = (run, circleClass) => {
    const wrapper = shallow(<TimeDisplay onCountdownClick={onCountDownClick} run={run} started={true} time={10} />);
    const playOrPause = wrapper.find('div.time-display > div.step-control');
    const { children } = playOrPause.props();
    expect(children.props.icon).toEqual(['far', circleClass]);
  };

  test('Countdown control running', () => {
    testBuilder(true, 'pause-circle');
  });

  test('Countdown control not running', () => {
    testBuilder(false, 'play-circle');
  });
});