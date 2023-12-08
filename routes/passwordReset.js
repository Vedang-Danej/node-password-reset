import express from 'express';
import { forgotPassword, passwordReset } from '../controllers/passwordResetController.js';

const router = express.Router();

router.post('/', forgotPassword);

router.post('/:token', passwordReset);

export default router;
