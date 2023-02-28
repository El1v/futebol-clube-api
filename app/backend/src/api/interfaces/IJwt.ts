import ITokenPayload from './ITokenPayload';

export default interface IJwt {
  generateToken(payload: ITokenPayload): string;
  validateToken(token: string): Promise< string >;
}
