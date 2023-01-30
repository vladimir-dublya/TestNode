const jwt = require('jsonwebtoken');
const { secret } = require('../config');
module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(403)
        .json({ message: 'You must be loggining in to continue' });
    }
    const decodedData = jwt.verify(token, secret);
    console.log(decodedData);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ message: 'You must be loggining in to continue' });
  }
};
