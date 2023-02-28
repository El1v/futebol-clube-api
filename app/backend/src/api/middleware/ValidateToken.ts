// import { Request, Response } from 'express';
// import IJwt from '../interfaces/IJwt';

// export default class ValidateToken {
//   public static async validateToken(req: Request, res: Response, jwt: IJwt) {
//     const { authorization } = req.headers;

//     if (!authorization) return res.status(401).send({ message: 'Token not found' });
//     const email = await jwt.validateToken(authorization);
//     req.email = email;
//     return res.status(200).send({ role: 'admin' });
//   }
// }

import { Request, Response } from 'express';
import EMAIL_NOT_FOUND from '../errors/CustomMessages/NotFoundEmailErrorMessage';
import EmailNotFoundError from '../errors/NotFoundEmailError';
import IJwt from '../interfaces/IJwt';
import IUserService from '../interfaces/IUserService';

export default class ValidateToken {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async validateToken(req: Request, res: Response, jwt: IJwt) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ message: 'Token not found' });
    const email = await jwt.validateToken(authorization);
    const user = await this._service.readByEmail(email);

    if (!user) throw new EmailNotFoundError(EMAIL_NOT_FOUND);

    const { role } = user.dataValues;

    return res.status(200).send({ role });
  }
}
