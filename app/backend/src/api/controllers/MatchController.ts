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

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.update(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: `Match updated id: ${id}` });
  }

  async create(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this._service.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals },
    );
    return res.status(201).json(result);
  }
}
