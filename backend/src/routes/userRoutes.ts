import express from 'express';
import { authUser, updateUserProfile, registerUser, logoutUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
