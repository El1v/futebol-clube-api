import Match from '../../database/models/MatchModel';

export default interface IMatchService {
  readAll(): Promise<Match[]>;
  finish(id: number): Promise<void>;
}
