import { Account } from './account';

describe('Account', () => {
  it('should create an instance', () => {
    expect(new Account(null,null,null,null,null)).toBeTruthy();
  });
});
