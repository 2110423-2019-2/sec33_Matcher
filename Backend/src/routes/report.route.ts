import express from 'express';
import { AdminController } from '../controllers';
import { asyncHandler } from '../utils/handlers';
import { ensureLoggedIn } from '../utils/userHandlers';

export const router = express.Router({ strict: true });
router.get('/', ensureLoggedIn('admin'), asyncHandler(AdminController.getAllReports));
router.post('/create', ensureLoggedIn(), asyncHandler(AdminController.createReport));
router.get('/delete/:reportId', ensureLoggedIn('admin'), asyncHandler(AdminController.deleteReport));
