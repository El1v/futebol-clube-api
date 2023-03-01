import { Router, Response, Request } from 'express';
import MatchController from '../controllers/MatchController';
import AuthUser from '../middleware/AuthUser';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchRoutes = Router();

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.findAll(req, res));

matchRoutes.patch(
  '/matches/:id/finish',
  AuthUser.validateToken,
  (req: Request, res: Response) => matchController.finish(req, res),
);

export default matchRoutes;
