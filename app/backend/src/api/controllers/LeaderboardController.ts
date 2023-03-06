import { Request, Response } from 'express';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import IMatchService from '../interfaces/IMatchService';
import ITeam from '../interfaces/ITeam';
import ITeamService from '../interfaces/ITeamService';

export default class LeaderboardController {
  private _teamService: ITeamService;
  private _matchService: IMatchService;

  constructor(teamService: ITeamService, matchService: IMatchService) {
    this._teamService = teamService;
    this._matchService = matchService;
  }

  static totalGames(id: number, matches: IMatch[]): number {
    let count = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id || match.awayTeamId === id) {
        count += 1;
      }
    });
    return count;
  }

  static goalsHome(id: number, matches: IMatch[]): number {
    let goals = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id) {
        goals += match.homeTeamGoals;
      }
      if (match.awayTeamId === id) {
        goals += match.awayTeamGoals;
      }
    });
    return goals;
  }

  static goalsAway(id: number, matches: IMatch[]): number {
    let goals = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id) {
        goals += match.awayTeamGoals;
      }
      if (match.awayTeamId === id) {
        goals += match.homeTeamGoals;
      }
    });
    return goals;
  }

  public static goalsBalance(id: number, matches: IMatch[]): number {
    const GP = this.goalsHome(id, matches);
    const GC = this.goalsAway(id, matches);

    const goalsBalance = GP - GC;
    return goalsBalance;
  }

  static totalLosses(id: number, matches: IMatch[]): number {
    let count = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals) {
        count += 1;
      }

      if (match.awayTeamId === id && match.awayTeamGoals < match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  }

  static totalVictories(id: number, matches: IMatch[]): number {
    let count = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals) {
        count += 1;
      }

      if (match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  }

  static totalDraws(id: number, matches: IMatch[]): number {
    let count = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals) {
        count += 1;
      }

      if (match.awayTeamId === id && match.awayTeamGoals === match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  }

  static totalPoints(id: number, matches: IMatch[]) : number {
    let totalPoints = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id) {
        if (match.homeTeamGoals > match.awayTeamGoals) totalPoints += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
      }
      if (match.awayTeamId === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) totalPoints += 3;
        if (match.awayTeamGoals === match.homeTeamGoals) totalPoints += 1;
      }
    });
    return totalPoints;
  }

  static sortArray(status: ILeaderboard[]) {
    const result = status.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
    return result;
  }

  static getAllStatus(teams: ITeam[], matches: IMatch[], isHome: boolean) {
    const result = teams.map((team) => {
      const filteredMatches = isHome ? matches.filter(({ homeTeamId }) => homeTeamId === team.id)
        : matches.filter(({ awayTeamId }) => awayTeamId === team.id);
      const totalGames = LeaderboardController.totalGames(team.id as number, filteredMatches);
      const totalPoints = LeaderboardController.totalPoints(team.id as number, filteredMatches);
      return { name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories: LeaderboardController.totalVictories(team.id as number, filteredMatches),
        totalDraws: LeaderboardController.totalDraws(team.id as number, filteredMatches),
        totalLosses: LeaderboardController.totalLosses(team.id as number, filteredMatches),
        goalsFavor: LeaderboardController.goalsHome(team.id as number, filteredMatches),
        goalsOwn: LeaderboardController.goalsAway(team.id as number, filteredMatches),
        goalsBalance: LeaderboardController.goalsBalance(team.id as number, filteredMatches),
        efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
      };
    });
    return result;
  }

  static getLeaderboard(teams: ITeam[], matches: IMatch[]) {
    const result = teams.map((team) => {
      const totalGames = LeaderboardController.totalGames(team.id as number, matches);
      const totalPoints = LeaderboardController.totalPoints(team.id as number, matches);
      return { name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories: LeaderboardController.totalVictories(team.id as number, matches),
        totalDraws: LeaderboardController.totalDraws(team.id as number, matches),
        totalLosses: LeaderboardController.totalLosses(team.id as number, matches),
        goalsFavor: LeaderboardController.goalsHome(team.id as number, matches),
        goalsOwn: LeaderboardController.goalsAway(team.id as number, matches),
        goalsBalance: LeaderboardController.goalsBalance(team.id as number, matches),
        efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
      };
    });
    return result;
  }

  async leaderboard(req: Request, res:Response) {
    const teams = await this._teamService.readAll();
    const matches = await this._matchService.readAll();
    const finalizedMatches = matches.filter((match) => match.inProgress === false);
    const leaderboardStatus = LeaderboardController.getLeaderboard(teams, finalizedMatches);
    const sortLeaderboardStatus = LeaderboardController.sortArray(leaderboardStatus);
    return res.status(200).json(sortLeaderboardStatus);
  }

  async homeLeaderboard(req: Request, res:Response) {
    const teams = await this._teamService.readAll();
    const matches = await this._matchService.readAll();
    const finalizedMatches = matches.filter((match) => match.inProgress === false);
    const leaderboardStatus = LeaderboardController.getAllStatus(teams, finalizedMatches, true);
    const sortLeaderboardStatus = LeaderboardController.sortArray(leaderboardStatus);
    return res.status(200).json(sortLeaderboardStatus);
  }

  async awayLeaderboard(req: Request, res:Response) {
    const teams = await this._teamService.readAll();
    const matches = await this._matchService.readAll();
    const finalizedMatches = matches.filter((match) => match.inProgress === false);
    const leaderboardStatus = LeaderboardController.getAllStatus(teams, finalizedMatches, false);
    const sortLeaderboardStatus = LeaderboardController.sortArray(leaderboardStatus);
    return res.status(200).json(sortLeaderboardStatus);
  }
}
