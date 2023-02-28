import { Request, Response, NextFunction } from 'express';

export default class ValidateUserFields {
  public static validateFields(req: Request, res: Response, next:NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }

    const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const isValid = email.match(validEmail);

    if (!isValid || password < 6) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    next();
  }
}
