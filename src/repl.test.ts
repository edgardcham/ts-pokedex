import { cleanInput } from './repl';
import { describe, expect, test } from 'vitest';

describe.each([
  {
    input: '  hello world  ',
    expected: ['hello', 'world'],
  },
  {
    input: 'a very long string      ',
    expected: ['a', 'very', 'long', 'string'],
  },
  //TODO: Add more test cases
])('cleanInput($input)', ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length); // Check if array has same length
    for (let i in expected) {
      expect(actual[i]).toBe(expected[i]); // Check if each element matches
    }
  });
});
