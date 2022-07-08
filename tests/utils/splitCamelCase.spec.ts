import { splitCamelCase } from '../../src/utils/splitCamelCase';

describe('Split Camel Case', () => {
  it('Should return an array with the words separated', () => {
    const text = 'CamelCaseTest';

    const result = splitCamelCase(text);

    expect(result).toStrictEqual(['Camel', 'Case', 'Test']);
  });
});
