import request from 'supertest';
import app from '../../src/app';
import User from '../../src/app/models/User';

const factory = require('../factories');

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
  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('user', {
      password: '123123',
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(200);
  });
  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('user', {
      password: '123123',
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('user', {
      password: '123123',
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('user', {
      password: '123123',
    });
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });

  it('should not be able access private routes whithout jwt token', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(401);
  });

  it('should not be able access private routes with jwt token invalid', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer asdaxas.asda2.das}`);
    expect(response.status).toBe(401);
  });
});
