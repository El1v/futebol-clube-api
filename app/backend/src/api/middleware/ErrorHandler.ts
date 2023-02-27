import { NextFunction, Request, Response } from 'express';

export default class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    console.log('antes do if');

    if (err instanceof Error && err.stack) {
      console.log('chega no if do error handler');

      return res.status(parseInt(err.stack, 10)).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Erro nao identificado' });
  }
}
