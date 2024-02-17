import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { userModel, IUser } from '../models/userModel';
import generateToken from '../utils/generateToken';

// @desc      auth user & set token | @route     POST /api/users/auth | @access    public
const authUser = asyncHandler(async (req: Request, res: Response) => {

  const { email, password }: IUser = req.body;
  
  const userFound = await userModel.findOne({ email: email });

  if (userFound && (await userFound.matchPasswords(password))) {
    generateToken(res, userFound._id);

    res.status(201).json({
      result: 'Login Successful',
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalide credentials');
  }
});

// @desc      register user | @route     POST /api/users/ | @access    public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;

  const userExist = await userModel.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error('User Already Exist');
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      result: 'Register Successful',
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalide User Data');
  }
});

// @desc      logout user | @route     POST /api/users/logout | @access    public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: 'User logged out',
  });
});

// @desc      get user profile | @route     GET /api/users/profile | @access    private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc      update user profile | @route     PUT /api/users/profile | @access    private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {

  const user = await userModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    message: 'Update User Profile',
  });
  
});

export { authUser, updateUserProfile, registerUser, logoutUser, getUserProfile };
