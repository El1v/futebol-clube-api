import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

export default class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    const result = await this._service.readAll();
    const { inProgress } = req.query;
    if (inProgress) {
      const filteredMatches = result.filter((match) => match.inProgress.toString() === inProgress);
      return res.status(200).json(filteredMatches);
    }
    return res.status(200).json(result);
  }

  async finish(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.finish(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}