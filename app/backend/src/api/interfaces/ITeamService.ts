import Team from '../../database/models/TeamModel';
// import ITeam from './ITeam';

export default interface ITeamService {
  // create(dto: ITeam): Promise<Team>;
  readAll(): Promise<Team[]>;
  readById(id: number): Promise<Team>;
}
