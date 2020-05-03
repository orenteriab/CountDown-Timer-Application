import { shallow } from 'enzyme';
import Halfway from './Halfway';
import React from 'react';

test('Must show label', () =>{
  const wrapper = shallow(<Halfway proposedTime="00:50" time={25} started={true} />);
  const container = wrapper.find('div.halfway-container');
  expect(container.exists()).toBe(true);

  const label = container.find('span');
  expect(label.exists()).toBe(true);

  const { children } = label.props();
  expect(children).toEqual('More than halfway there!');
});

test('Must not show label', () =>{
  const wrapper = shallow(<Halfway proposedTime="00:50" time={26} started={true} />);
  const container = wrapper.find('div.halfway-container');
  expect(container.exists()).toBe(true);

  const label = container.find('span');
  expect(label.exists()).toBe(false);
});