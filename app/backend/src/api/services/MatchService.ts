import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
import IMatchService from '../interfaces/IMatchService';
import IMatch from '../interfaces/IMatch';

export default class MatchService implements IMatchService {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async finish(id: number): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async create(dto: IMatch): Promise<IMatch> {
    const result = await this.model.create(
      { ...dto, inProgress: true },
    );

    const newMatch = {
      id: result.id,
      ...dto,
      inProgress: true,
    };
    return newMatch;
  }
}
