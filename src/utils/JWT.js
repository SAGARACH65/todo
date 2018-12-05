import jwt from 'jsonwebtoken'

const verifyJWT = (token) => {

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }

      resolve(decodedToken)
    });
  });
}

const generateJWT = (user, expiry) => {
  const token = jwt.sign({

    username: user.username
  }, process.env.JWT_SECRET, {
      expiresIn: expiry,
      algorithm: 'HS256'
    });

  return token;
}

export { verifyJWT, generateJWT }
