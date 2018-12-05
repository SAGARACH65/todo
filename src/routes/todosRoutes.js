import { Router } from 'express';
import * as todosController from '../controllers/todos';
const router = Router();

/**
 * GET /api/todos
 */
router.get('/getAll', todosController.fetchAll);

/**
 * POST /api/todos
 */
router.post('/register', todosController.create);

export default router;


