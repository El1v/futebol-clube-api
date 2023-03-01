import { Router, Response, Request } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const matchRoutes = Router();

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.findAll(req, res));

export default matchRoutes;
