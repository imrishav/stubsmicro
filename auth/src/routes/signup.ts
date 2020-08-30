import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

import { BadRequestError } from '../errors/bad-request.error';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password Problem'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email is already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    console.log(user);

    //Geenrate web token..

    const userJWT = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    // req.session.jwt = userJWT // this will give error so we create a new Objet

    req.session = {
      jwt: userJWT,
    };

    console.log(req.session);

    res.status(201).send(user);
  }
);

export { router as signupRouter };
