import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const teamRoutes = Router();

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.findAll(req, res));

export default teamRoutes;
