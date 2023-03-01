import Match from '../../database/models/MatchModel';
import IMatch from './IMatch';

export default interface IMatchService {
  readAll(): Promise<Match[]>;
  finish(id: number): Promise<void>;
  update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
  create(dto: IMatch): Promise<IMatch>;
}
