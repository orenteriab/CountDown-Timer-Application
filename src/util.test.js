import { convertRawTime } from './util';

test('Convert raw Time', () => {
  const formatted01 = convertRawTime(100);
  expect(formatted01).toEqual('01:40');

  const formatted02 = convertRawTime(60);
  expect(formatted02).toEqual('01:00');

  const formatted03 = convertRawTime(170);
  expect(formatted03).toEqual('02:50');
});
