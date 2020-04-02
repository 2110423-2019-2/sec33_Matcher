import express from 'express';
import { UserController } from '../controllers';
import { asyncHandler } from '../utils/handlers';
import { ensureLoggedIn } from '../utils/userHandlers';

export const router = express.Router({ strict: true });

router.get('/', ensureLoggedIn(), asyncHandler(UserController.getProfile));
router.get('/:userId', asyncHandler(UserController.getProfile));
router.post('/update', ensureLoggedIn(), asyncHandler(UserController.updateProfile));
router.delete('/delete/:userId', ensureLoggedIn(), asyncHandler(UserController.deleteProfile));
