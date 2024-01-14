import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// @desc      auth user & set token
// @route     POST /api/users/auth
// @access    public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Auth User',
  });
});

// @desc      register user
// @route     POST /api/users/
// @access    public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Register User',
  });
});

// @desc      logout user
// @route     POST /api/users/logout
// @access    public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Logout User',
  });
});

// @desc      get user profile
// @route     GET /api/users/profile
// @access    private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get User Profile',
  });
});

// @desc      update user profile
// @route     PUT /api/users/profile
// @access    private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Update User Profile',
  });
});

export { authUser, updateUserProfile, registerUser, logoutUser, getUserProfile };
