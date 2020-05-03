import { shallow } from 'enzyme';
import Halfway from './Halfway';
import React from 'react';

/**
 * Is the template for the test
 * @param {boolean} labelExpected
 */
const testBuilder = (wrapper, labelExpected) => {
  const container = wrapper.find('div.halfway-container');
  expect(container.exists()).toBe(true);

  const label = container.find('span');
  expect(label.exists()).toBe(labelExpected);

  return label;
};

/**
 * Basic test structure builder.
 * @param {string} proposedTime
 * @param {number} time
 * @param {boolean} started
 * @param {boolean} labelExpected
 * @param {string} labelValue
 */
const structureBuilder = (proposedTime, time, started, labelExpected, labelValue) => {
  const wrapper = shallow(<Halfway
    proposedTime={proposedTime}
    time={time}
    started={started} />);
  const label = testBuilder(wrapper, labelExpected);

  if (labelExpected) {
    const { children } = label.props();
    expect(children).toEqual(labelValue);
  }
};

describe('Must show', () => {
  test('Halfway label', () => {
    structureBuilder("1", 30, true, true, 'More than halfway there!');
  });

  test('Time\'s up', () => {
    structureBuilder("0", 0, false, true, 'Time\'s up!');
  });
});

describe('Must not show', () => {
  test('More than 50%', () => {
    structureBuilder("1", 31, true, false);
  });

  test('Initial load', () => {
    structureBuilder("", 0, false, false);
  });
});