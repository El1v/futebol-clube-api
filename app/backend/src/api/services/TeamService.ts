import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import ID_NOT_FOUND from '../errors/CustomMessages/NotFoundErrorMessage';
import NotFoundError from '../errors/NotFoundError';
// import ITeam from '../interfaces/ITeam';
import ITeamService from '../interfaces/ITeamService';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async readById(id: number): Promise<Team> {
    const team = await this.model.findByPk(id);
    if (!team) throw new NotFoundError(ID_NOT_FOUND);

    return team;
  }
}
