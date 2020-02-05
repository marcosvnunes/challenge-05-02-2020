import faker from 'faker';
import User from '../src/app/models/User';

const { factory } = require('factory-girl');

factory.define('user', User, {
  email: faker.internet.email(),
  password: faker.internet.password(),
});
module.exports = factory;
