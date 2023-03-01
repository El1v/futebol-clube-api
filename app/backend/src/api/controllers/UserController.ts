import { Request, Response } from 'express';
import IJwt from '../interfaces/IJwt';
import IUserService from '../interfaces/IUserService';

export default class UserController {
  private _service: IUserService;
  private _jwt: IJwt;

  constructor(service: IUserService, jwt: IJwt) {
    this._service = service;
    this._jwt = jwt;
  }

  async validateLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    await this._service.validateLogin(email, password);
    const token = this._jwt.generateToken(email);
    return res.status(200).json({ token });
  }

  async findAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async getRole(req: Request, res: Response) {
    const { payload } = req.body;

    const result = await this._service.readByEmail(payload);
    const role = result?.dataValues.role;

    return res.status(200).json({ role });
  }
}
