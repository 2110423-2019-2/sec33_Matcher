import express from 'express';
import { TaskController } from '../controllers';
import { asyncHandler } from '../utils/handlers';
import { ensureLoggedIn } from '../utils/userHandlers';

export const router = express.Router({ strict: true });

router.post('/', ensureLoggedIn(), asyncHandler(TaskController.createTask));
router.post('/update/:taskId', ensureLoggedIn(), asyncHandler(TaskController.updateTask));
router.get('/matched', ensureLoggedIn(), asyncHandler(TaskController.getMatchedTasks));
router.get('/finished', ensureLoggedIn(), asyncHandler(TaskController.getFinishedTasks));
router.get('/available', ensureLoggedIn(), asyncHandler(TaskController.getAvailableTasks));
router.post('/rate', ensureLoggedIn(), asyncHandler(TaskController.rateTask));
