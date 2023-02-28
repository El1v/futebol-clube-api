import * as jwt from 'jsonwebtoken';
import IJwt from '../interfaces/IJwt';
import ITokenPayload from '../interfaces/ITokenPayload';

export default class JWT implements IJwt {
  private jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

  generateToken(payload: ITokenPayload): string {
    const token = jwt.sign(payload, this.jwtSecret);
    return token;
  }

  validateToken(token: string): ITokenPayload {
    const payload = jwt.verify(token, this.jwtSecret) as ITokenPayload;
    return payload;
  }
}
