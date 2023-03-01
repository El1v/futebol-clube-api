export default interface IMatch {
  id?: number;
  homeTeamId: number | string;
  awayTeamId: number | string;
  homeTeamGoals: number | string;
  awayTeamGoals: number | string;
  inProgress?: boolean | string;
}
