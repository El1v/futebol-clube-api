import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import IdNotFoundError from '../errors/IdNotFoundError';
// import ITeam from '../interfaces/ITeam';
import ITeamService from '../interfaces/ITeamService';

const ID_NOT_FOUND = 'Id not found';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async readById(id: number): Promise<Team> {
    const team = await this.model.findByPk(id);
    if (!team) {
      throw new IdNotFoundError(ID_NOT_FOUND);
    }

    return team;
  }
}
