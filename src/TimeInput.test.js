import { shallow } from 'enzyme';
import React from 'react';
import TimeInput from './TimeInput';

const onCountdownChange = jest.fn();
const onStartClick = jest.fn();

const selectorDisableCheck = (wrapper, selector, expected) => {
  const selected = wrapper.find(selector);
  expect(selected.exists()).toBe(true);
  
  const { disabled } = selected.props();
  expect(disabled).toBe(expected);
};

test('Basic render', () => {
  const wrapper = shallow(<TimeInput
    onCountdownChange={onCountdownChange}
    started={false}
    propsedTime=""
    onStartClick={onStartClick} />);

  selectorDisableCheck(wrapper, 'div.time-input-container > input.countdown-input', false);
  selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
});

describe('Wrong format', () => {
  test('One letter', () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      propsedTime="a"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });

  test('One number one letter', () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      propsedTime="0a"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });

  test('One number one letter', () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      propsedTime="0a"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });

  test('One number and colon', () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      propsedTime="0:"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });

  test('Decimal', () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      propsedTime="1.5"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });

  test('Negative', () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      propsedTime="-1"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });

  test('Negative decimal', () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      propsedTime="-1.3"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });

  test("Zero", () => {
    const wrapper = shallow(<TimeInput
      onCountdownChange={onCountdownChange}
      started={false}
      proposedTime="0"
      onStartClick={onStartClick} />);
    selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', true);
  });
});

test('Good format', () => {
  const wrapper = shallow(<TimeInput
    onCountdownChange={onCountdownChange}
    started={false}
    proposedTime="1"
    onStartClick={onStartClick} />);

  selectorDisableCheck(wrapper, 'div.time-input-container > button.countdown-button', false);
});
