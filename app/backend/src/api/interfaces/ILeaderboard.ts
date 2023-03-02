export default interface ILeaderboard {
  name?: number;
  totalPoints?: number | string;
  totalGames?: number | string;
  totalVictories?: number | string;
  totalDraws?: number | string;
  totalLosses?: number | string;
  goalsFavor?: number | string;
  goalsOwn?: number | string;
}
