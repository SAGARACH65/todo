import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import userRoutes from './routes/userRoutes';
import todosRoutes from './routes/todosRoutes';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});


/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.use('/users', userRoutes);
router.use('/todos', todosRoutes);


export default router;
