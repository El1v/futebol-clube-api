import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import JWT from '../utils/JWT';

const userRoutes = Router();
const userService = new UserService();
const jwt = new JWT();
const userController = new UserController(userService, jwt);

userRoutes.get('/login', (req: Request, res: Response) => userController.findAll(req, res));
userRoutes.post('/login', (req: Request, res: Response) => userController.validateLogin(req, res));

export default userRoutes;
