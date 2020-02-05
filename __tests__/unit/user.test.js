import request from 'supertest';
import app from '../../src/app';
import User from '../../src/app/models/User';

// import factory from '../factories';

export default function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

describe('Authentication', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
  });
  it('should be able to register', async () => {
    const user = await User.create({
      email: 'tickeliro0@gmail.com',
      password: '123123',
    });
    expect(await user.checkPassword('123123')).toBe(true);
  });
});
