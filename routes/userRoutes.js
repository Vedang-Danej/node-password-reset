import express from 'express';
import { loginUser, registerUser, protectedRoute } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/protected', protect, protectedRoute);

export default router;
