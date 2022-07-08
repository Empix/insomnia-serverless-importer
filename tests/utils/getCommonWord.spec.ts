import { getCommonWord } from '../../src/utils/getCommonWord';

describe('Get Common Word', () => {
  const FAKE_texts = {
    box: [
      'ListServices',
      'CreateBox',
      'EditBox',
      'ListBoxs',
      'DeleteBox',
      'ShowBox',
      'ShowBoxById',
    ],
    user: ['CreateUser', 'EditUser', 'DeleteUser', 'ShowUser'],
    cars: ['FindAllCars'],
  };

  it('Should return the common word of an array of strings (CamelCase)', () => {
    const resultBox = getCommonWord(FAKE_texts.box);
    expect(resultBox).toBe('Box');

    const resultUser = getCommonWord(FAKE_texts.user);
    expect(resultUser).toBe('User');

    const resultCars = getCommonWord(FAKE_texts.cars);
    expect(resultCars).toBe('Cars');
  });
});
