import { convertRawTime } from './util';

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
