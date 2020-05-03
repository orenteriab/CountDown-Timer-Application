import { convertFormattedTimeToRawTime, convertRawTime } from './util';

describe('Convert raw Time', () => {
  test('Testing with number', () => {
    const formatted01 = convertRawTime(100);
    expect(formatted01).toEqual('01:40');

    const formatted02 = convertRawTime(60);
    expect(formatted02).toEqual('01:00');

    const formatted03 = convertRawTime(170);
    expect(formatted03).toEqual('02:50');
  });

  test('Time\'s up', () => {
    const formattedTimesUp = convertRawTime('Time\'s up');
    expect(formattedTimesUp).toEqual('Time\'s up');
  });
});

test('Convert Formatted Time', () => {
    const seconds01 = convertFormattedTimeToRawTime('01:40');
    expect(seconds01).toEqual(100);

    const seconds02 = convertFormattedTimeToRawTime('01:00');
    expect(seconds02).toEqual(60);

    const seconds03 = convertFormattedTimeToRawTime('02:50');
    expect(seconds03).toEqual(170);
});
