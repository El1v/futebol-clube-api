import User from '../../database/models/UserModel';

export default interface IUserService {
  validateLogin(email: string, password: string): Promise<User>
  readAll(): Promise<User[]>;
  readByEmail(email: string): Promise<User | null>;
}
