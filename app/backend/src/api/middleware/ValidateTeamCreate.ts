import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

const teamService = new TeamService();

export default class ValidateTeamCreate {
  public static async validateFields(req: Request, res: Response, next:NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).send(
        {
          message: 'It is not possible to create a match with two equal teams',
        },
      );
    }
    await teamService.readById(homeTeamId);
    await teamService.readById(awayTeamId);

    next();
  }
}
