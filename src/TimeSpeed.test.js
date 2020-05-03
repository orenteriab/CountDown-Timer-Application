import { shallow } from 'enzyme';
import React from 'react';
import TimeSpeed from './TimeSpeed';

describe('TimeSpeedTests', () => {
  const onSpeedChange = jest.fn((_speed) => {});

  afterEach(() => {
    onSpeedChange.mockReset();
  });

  test('Basic render', () => {
    const wrapper = shallow(<TimeSpeed started={false} speed={1} onSpeedChange={onSpeedChange} run={false} />);
    expect(wrapper.exists('.time-speed-container')).toEqual(true);
    expect(onSpeedChange).toBeCalledTimes(3);
  });

  describe('Disable', () => {
    /**
     * Boiler plate for the test when the buttons should
     * be all disabled.
     * @param {boolean} started
     */
    const testBuilder = (started) => {
      const wrapper = shallow(<TimeSpeed started={started} speed={1} onSpeedChange={onSpeedChange} run={false} />);
      const buttons = wrapper.find('.time-speed-container').find('button[disabled=true]');
      expect(buttons).toHaveLength(3);
    }

    test('Disabled before the countdown started', () => {
      testBuilder(false);
    });

    test('Disabled after the countdown started but the countdown is paused', () => {
      testBuilder(true);
    });
  });

  describe('Paces', () => {
    /**
     * Function to build the test template for the
     * buttons that control the speed of the countdown.
     * @param {number} pace
     * @param {boolean} run
     */
    const buttonTest = (pace, run, switchDisabled = false) => {
      const wrapper = shallow(<TimeSpeed started={true} speed={pace} onSpeedChange={onSpeedChange} run={run} />);

      const disabledButtons = wrapper.find('.time-speed-container').find(`button[disabled=${!switchDisabled}]`);
      expect(disabledButtons).toHaveLength(0);

      const buttons = wrapper.find('.time-speed-container').find(`button[disabled=${switchDisabled}]`);
      expect(buttons).toHaveLength(3);

      const currentSpeedButton = wrapper.find('.time-speed-container').find('button.active');
      expect(currentSpeedButton).toHaveLength(1);

      const { children } = currentSpeedButton.props();
      return children;
    };

    /**
     * Function to call dinamically the tests on the
     * buttons that control the speed of the countdown.
     * @param {number} pace
     * @param {boolean} run
     * @param {boolean} switchDisabled?
     */
    const testBuilder = (pace, run, switchDisabled = false) => {
      expect(buttonTest(pace, run, switchDisabled)).toEqual(`${pace}x`);
    };

    describe('When countdown is running', () => {
      test('Regular active', () => {
        testBuilder(1, true);
      });
  
      test('One and a half active', () => {
        testBuilder(1.5, true);
      });
  
      test('Two active', () => {
        testBuilder(2, true);
      });
    });

    describe('When countdown is not running', () => {
      test('Regular active', () => {
        testBuilder(1, false, true);
      });
  
      test('One and a half active', () => {
        testBuilder(1.5, false, true);
      });
  
      test('Two active', () => {
        testBuilder(2, false, true);
      });
    });

  });
});
