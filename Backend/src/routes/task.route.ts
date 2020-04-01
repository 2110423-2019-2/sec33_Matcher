import express from 'express';
import { TaskController } from '../controllers';
import { asyncHandler } from '../utils/handlers';
import { ensureLoggedIn } from '../utils/userHandlers';

export const router = express.Router({ strict: true });

router.post('/', ensureLoggedIn(), asyncHandler(TaskController.createTask));
router.get('/:id', ensureLoggedIn(), asyncHandler(TaskController.getTaskById));
router.post('/update/:taskId', ensureLoggedIn(), asyncHandler(TaskController.updateTask));
router.post('/rate', ensureLoggedIn(), asyncHandler(TaskController.rateTask));

router.get('/accept/:id', ensureLoggedIn(), asyncHandler(TaskController.acceptTask));
router.get('finish/:id', ensureLoggedIn(), asyncHandler(TaskController.finishTask));

router.get('/pending', ensureLoggedIn(), asyncHandler(TaskController.getPendingTasks));
router.get('/matched', ensureLoggedIn(), asyncHandler(TaskController.getMatchedTasks));
router.get('/reqfin', ensureLoggedIn(), asyncHandler(TaskController.getReqFinTasks));
router.get('/finished', ensureLoggedIn(), asyncHandler(TaskController.getFinishedTasks));
router.get('/available', ensureLoggedIn(), asyncHandler(TaskController.getAvailableTasks));
