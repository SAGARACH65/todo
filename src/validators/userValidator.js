import Joi from 'joi';
import validate from '../utils/validate';
import * as userService from '../services/userService';
import { verifyJWT } from '../utils/JWT';


const USER = {
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  username: Joi.string().alphanum().min(3).max(30).required(),
};


/**
 * Validate create/update user request.
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, USER)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Promise}
 */
function validateAccessToken(req, res, next) {
  return verifyJWT(req.headers['access-token'])
    .then(() => next())
    .catch(err => next({ ...err, isAccessTokenExpired: true }));

}

/**
 * Validate users existence.
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Promise}
 */
async function validateRefreshToken(req, res, next) {
  const user = await userService.getUserFromRefreshToken(req);

  return verifyJWT(req.headers['refresh-token'])
    .then(() => {
      if (!user) throw (new Error({ refreshTokenAbscent: true }));
      next();
    }).catch(err => {
      if (!err.refreshTokenAbscent) err['isRefreshTokenExpired'] = true;
      next({ ...err });
    })
}


export { findUser, userValidator, validateAccessToken, validateRefreshToken };
