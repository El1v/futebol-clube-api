import { ModelStatic } from 'sequelize';
import bcrypt = require('bcryptjs');
import User from '../../database/models/UserModel';
import INVALID_FIELDS from '../errors/CustomMessages/InvalidLoginErrorMessage';
import NotFoundError from '../errors/NotFoundError';
import InvalidFieldsError from '../errors/InvalidFieldsError';
import IUserService from '../interfaces/IUserService';
import EMAIL_NOT_FOUND from '../errors/CustomMessages/NotFoundEmailErrorMessage';
import InvalidEmailOrPassword from '../errors/InvalidEmailOrPassword';
import INVALID_EMAIL_PASSWORD from '../errors/CustomMessages/InvalidEmailOrPasswordMessage';
import EmailNotFoundError from '../errors/NotFoundEmailError';

export default class UserService implements IUserService {
  protected model: ModelStatic<User> = User;

  async validateLogin(email: string, password: string): Promise<User> {
    if (!email || !password) throw new InvalidFieldsError(INVALID_FIELDS);

    const user = await this.model.findOne({ where: { email } });

    if (!user) throw new EmailNotFoundError(EMAIL_NOT_FOUND);

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) throw new InvalidEmailOrPassword(INVALID_EMAIL_PASSWORD);

    return user;
  }

  async readAll(): Promise<User[]> {
    return this.model.findAll();
  }
}
