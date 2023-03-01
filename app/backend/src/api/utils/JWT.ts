import * as jwt from 'jsonwebtoken';
import INVALID_TOKEN from '../errors/CustomMessages/InvalidTokenMessage';
import InvalidToken from '../errors/InvalidToken';
import IJwt from '../interfaces/IJwt';
import ITokenPayload from '../interfaces/ITokenPayload';

export default class JWT implements IJwt {
  private jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

  generateToken(payload: ITokenPayload): string {
    const token = jwt.sign(payload, this.jwtSecret);
    return token;
  }

  async validateToken(token: string): Promise<string> {
    try {
      const decryptedData = await jwt.verify(token, this.jwtSecret) as string;
      return decryptedData;
    } catch (error) {
      throw new InvalidToken(INVALID_TOKEN);
    }
  }
}
