import express from 'express';
import { authUser, updateUserProfile, registerUser, logoutUser, getUserProfile } from '../controllers/userController';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;
