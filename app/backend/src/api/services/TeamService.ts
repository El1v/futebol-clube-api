import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
// import ITeam from '../interfaces/ITeam';
import ITeamService from '../interfaces/ITeamService';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async readById(id: number): Promise<Team> {
    const team = await this.model.findByPk(id);
    if (!team) throw new Error('not found');
    return team;
  }
}
