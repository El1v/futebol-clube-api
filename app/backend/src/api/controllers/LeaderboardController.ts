import { Request, Response } from 'express';
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

  // static totalDraws(id: number, matches: IMatch[]): number {
  //   let count = 0;
  //   matches.forEach((match) => {
  //     if (match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals) {
  //       count += 1;
  //     }

  //     if (match.awayTeamId === id && match.awayTeamGoals === match.homeTeamGoals) {
  //       count += 1;
  //     }
  //   });

  //   return count;
  // }

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

  static getAllStatus(teams: ITeam[], matches: IMatch[]) {
    const result = teams.map((team) => {
      const totalGames = LeaderboardController.totalGames(team.id as number, matches);
      const totalPoints = LeaderboardController.totalPoints(team.id as number, matches);
      const goalsHome = LeaderboardController.goalsHome(team.id as number, matches);
      const goalsAway = LeaderboardController.goalsAway(team.id as number, matches);
      const totalLosses = LeaderboardController.totalLosses(team.id as number, matches);
      const totalVictories = LeaderboardController.totalVictories(team.id as number, matches);
      return { name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws: Math.abs(totalGames - totalVictories - totalLosses),
        totalLosses,
        goalsFavor: goalsHome,
        goalsOwn: goalsAway,
      };
    });
    return result;
  }

  async leaderboard(req: Request, res:Response) {
    const teams = await this._teamService.readAll();
    const matches = await this._matchService.readAll();
    const leaderboardStatus = LeaderboardController.getAllStatus(teams, matches);
    return res.status(200).json(leaderboardStatus);
  }
}
