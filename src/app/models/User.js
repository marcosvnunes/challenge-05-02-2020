import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        cpf: Sequelize.STRING,
        firstName: Sequelize.JSON,
        lastName: Sequelize.JSON,
        birthday: Sequelize.JSON,
        phoneNumber: Sequelize.JSON,
        address: Sequelize.JSON,
        amountRequested: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET, {
      expiresIn: process.env.APP_SECRET_EXPIRE,
    });
  }
}

export default User;
