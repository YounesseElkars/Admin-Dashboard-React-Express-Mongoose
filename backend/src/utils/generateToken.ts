import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

const generateToken = (res: Response, userID: ObjectId) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'developement',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
