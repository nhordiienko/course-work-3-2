const jwt = require('jsonwebtoken');

module.exports.releaseToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, 'secret');
    if (req.params.id !== decoded.id) {
      res.status(401).json({ message: 'Auth failed' });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Auth failed' });
  }
};
