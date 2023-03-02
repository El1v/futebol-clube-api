import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const matchService = new MatchService();

const leaderboardController = new LeaderboardController(teamService, matchService);

const leaderboardRoutes = Router();

leaderboardRoutes.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardController.leaderboard(req, res),
);
export default leaderboardRoutes;
