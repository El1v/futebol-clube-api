import Match from '../../database/models/MatchModel';

export default interface ILeaderboardService {
  readAll(): Promise<Match[]>;
}
