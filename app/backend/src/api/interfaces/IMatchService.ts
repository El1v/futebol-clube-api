import Match from '../../database/models/MatchModel';

export default interface IMatchService {
  readAll(): Promise<Match[]>;
}
