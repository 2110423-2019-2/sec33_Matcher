import express from 'express';
import { AdminController } from '../controllers';
import { asyncHandler } from '../utils/handlers';
import { ensureLoggedIn } from '../utils/userHandlers';

export const router = express.Router({ strict: true });
router.get('/users', ensureLoggedIn('admin'), asyncHandler(AdminController.getAllUsers));