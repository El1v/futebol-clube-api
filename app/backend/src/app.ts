import 'express-async-errors';
import * as express from 'express';
import ErrorHandler from './api/middleware/ErrorHandler';
import teamRoutes from './api/routes/teamRoutes';
import userRoutes from './api/routes/userRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.initRoutes();
    this.initMiddlewares();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initRoutes(): void {
    this.app.use(userRoutes);
    this.app.use(teamRoutes);
  }

  private initMiddlewares(): void {
    this.app.use(ErrorHandler.handle);
    process.on('uncaughtException', (err) => {
      console.error(err, 'Uncaught Exception thrown');
      process.exit(1);
    });
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
