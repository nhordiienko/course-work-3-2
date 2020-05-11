const jwt = require('jsonwebtoken');

module.exports.getCompanyId = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, 'secret');
    req.params.id = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed' });
  }
};
