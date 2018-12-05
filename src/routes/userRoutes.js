import { Router } from 'express';
import * as userController from '../controllers/users';
import { findUser, userValidator, validateAccessToken, validateRefreshToken } from '../validators/userValidator';

const router = Router();

/**
 * GET /api/users
 */
router.get('/getAll', validateAccessToken, userController.fetchAll);

/**
 * GET /api/users
 */
router.get('/getTokens', validateRefreshToken, userController.getTokens);

// /**
//  * GET /api/users/:id
//  */
router.get('/:id', userController.fetchById);


/**
 * POST /api/users
 */
router.post('/register', userValidator, userController.create);

/**
 * POST /api/users
 */
router.post('/login', userController.login);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, userController.deleteUser);

export default router;
