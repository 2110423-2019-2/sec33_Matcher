import express from 'express';
import { TaskController } from '../controllers';
import { asyncHandler } from '../utils/handlers';
import { ensureLoggedIn } from '../utils/userHandlers';

export const router = express.Router({ strict: true });

router.post('/', ensureLoggedIn(), asyncHandler(TaskController.createTask));
router.get('/matched', ensureLoggedIn(), asyncHandler(TaskController.getMatchedTasks));
router.get('/finished', ensureLoggedIn(), asyncHandler(TaskController.getFinishedTasks));
// TODO add api for task here
