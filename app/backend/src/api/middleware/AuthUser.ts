import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

export default class AuthUser {
  public static validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET as string);
      req.body.payload = payload;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
