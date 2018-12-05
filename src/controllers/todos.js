import HttpStatus from 'http-status-codes';
import * as todoService from '../services/todoService';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  todoService
    .fetchTodos()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {

  todoService
    .createTodos(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ message: 'todo added' }))
    .catch(err => next(err));
}
