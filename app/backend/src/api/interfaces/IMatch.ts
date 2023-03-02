export default interface IMatch {
  id?: number;
  homeTeamId: number | string;
  awayTeamId: number | string;
  homeTeamGoals: number ;
  awayTeamGoals: number ;
  inProgress?: boolean | string;
}
