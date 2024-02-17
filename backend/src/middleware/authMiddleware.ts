import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { userModel, IUser } from '../models/userModel';
import { NextFunction, Request, Response } from 'express';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token = '';
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      req.user = (await userModel.findById(decoded.userID).select('-password')) as any;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized , invalide token .');
    }
  } else {
    res.status(400);
    throw new Error('Not authorized , no token');
  }
});

export { protect };
