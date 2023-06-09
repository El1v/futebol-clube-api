import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

export default class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  async findAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.readById(parseInt(id, 10));
    return res.status(200).json(result);
  }
}
