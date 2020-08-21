import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation.error';

const router = express.Router();

router.post(
  '/api/users/sigin',
  [
    body('email').isEmail().withMessage('Email Must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required..'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  }
);

export { router as signinRouter };
