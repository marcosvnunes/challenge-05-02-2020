import Sequelize from 'sequelize';

import User from '../app/models/User';
import User_test from '../app/models/User_test';

import databaseConfig from '../config/database';

const models = [User, User_test];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
