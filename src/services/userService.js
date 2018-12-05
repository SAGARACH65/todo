import Boom from 'boom';
import User from '../models/user';
import generateHash from '../utils/hashAndSalt';
import { generateJWT } from '../utils/JWT';
import bcrypt from 'bcrypt';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {

  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Get a user from refreshToken
 *
 * @param  {Object}  req
 * @return {Promise}
 */
export function getUserFromRefreshToken(req) {
  return User.where({ refreshToken: req.headers['refresh-token'] }).fetch();
}


/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export async function createUser(user) {
  return new User({
    name: user.name,
    username: user.username,
    password: await generateHash(user.password),
    email: user.email
  }).save();

}

/**
 * Returns new the current token
 *
 * @param  {Object}  req
 * @return {Promise}
 */
export async function getUserToken(req) {
  const user = await getUserFromRefreshToken(req);

  const accessToken = generateJWT(user.attributes, process.env.ACCESS_TOKEN_VALIDITY);
  const refreshToken = generateJWT(user.attributes, process.env.REFRESH_TOKEN_VALIDITY);

  return new Promise(async resolve => {
    await User.where({ username: user.attributes.username }).save({ refreshToken }, { patch: true });
    resolve({ accessToken, refreshToken, message: 'tokenized successful' });

  });

}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function loginUser(user) {

  const accessToken = generateJWT(user, process.env.ACCESS_TOKEN_VALIDITY);
  const refreshToken = generateJWT(user, process.env.REFRESH_TOKEN_VALIDITY);

  return new Promise(async (resolve, reject) => {

    const USER = await new User({ username: user.username }).fetch();

    if (!USER) return reject({ isUserNotFound: true })

    bcrypt.compare(user.password, USER.get('password'), async function (err, match) {
      if (!match) {
        resolve({ message: 'invalid password' });
      } else {

        await User.where({ username: user.username }).save({ refreshToken }, { patch: true });

        resolve({ accessToken, refreshToken, message: 'login successful' });
      }
    });
  });
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}mon
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
