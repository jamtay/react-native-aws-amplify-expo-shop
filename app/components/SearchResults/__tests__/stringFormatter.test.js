import {filterNull, removeTrailingComma} from '../stringFormatter';

describe('filterNull() string formatter tests', () => {
  const acceptableTestCases = [
    'A string',
    'example string, with comma',
    'another string with trailing comma,',
  ];
  acceptableTestCases.forEach(testCase => {
    it(`should return the original string if null is not present for string - ${testCase}`, () => {
      const filteredNullValue = filterNull(testCase);
      expect(filteredNullValue).toEqual(testCase);
    });
  });

  const nullTestCases = [
    {
      message: 'null',
      value: null,
    },
    {
      message: 'null string',
      value: 'null',
    },
    {
      message: 'single comma',
      value: ',',
    },
    {
      message: 'comma with a space',
      value: ', ',
    },
  ];
  nullTestCases.forEach(testCase => {
    it(`should return an empty string if ${
      testCase.message
    } is supplied`, () => {
      const filteredNullValue = filterNull(testCase.value);
      expect(filteredNullValue).toEqual('');
    });
  });

  const emptySpacesTextStringsTestCases = [
    '   string  ',
    'string  ',
    '   string',
    'null string   null',
  ];
  emptySpacesTextStringsTestCases.forEach(testCase => {
    it(`should return the original string with nulls stripped out for string - "${testCase}"`, () => {
      const filteredNullValue = filterNull(testCase);
      expect(filteredNullValue).toEqual('string');
    });
  });

  it('should remove the trailing comma if "null," is supplied', () => {
    let filteredNullValue = filterNull('null,');
    expect(filteredNullValue).toEqual('');
    filteredNullValue = filterNull('null, ');
    expect(filteredNullValue).toEqual('');
  });

  it('should remove the middle null if two strings are supplied separated by null "string null anotherString"', () => {
    const filteredNullValue = filterNull('string null anotherString');
    expect(filteredNullValue).toEqual('string anotherString');
  });
});

describe('removeTrailingComma() string formatter tests', () => {
  const TEST_VALUE = 'Some string';

  it('should return the original string if no trailing comma is supplied', () => {
    const filteredValue = removeTrailingComma(TEST_VALUE);
    expect(filteredValue).toEqual(TEST_VALUE);
  });

  it('should remove the trailing comma from a string if supplied', () => {
    const filteredValue = removeTrailingComma(TEST_VALUE + ',');
    expect(filteredValue).toEqual(TEST_VALUE);
  });

  it('should remove the trailing comma from a string including the trailing space if supplied', () => {
    const filteredValue = removeTrailingComma(TEST_VALUE + ', ');
    expect(filteredValue).toEqual(TEST_VALUE);
  });

  it('should trim values around trailing comma', () => {
    const filteredValue = removeTrailingComma(TEST_VALUE + '   , ');
    expect(filteredValue).toEqual(TEST_VALUE);
  });

  it('should return an empty string if a comma is supplied with whitespace surrounding', () => {
    const filteredValue = removeTrailingComma('   , ');
    expect(filteredValue).toEqual('');
  });

  it('should trim values', () => {
    const filteredValue = removeTrailingComma('   ' + TEST_VALUE + '  ');
    expect(filteredValue).toEqual(TEST_VALUE);
  });

  it('should return empty string if no value is supplied', () => {
    const filteredValue = removeTrailingComma(undefined);
    expect(filteredValue).toEqual('');
  });
});
