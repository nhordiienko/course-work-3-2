module.exports.checkName = (isRequired) => (req, res, next) => {
  const pattern = /^[a-zA-Z0-9\s]{2,32}$/;
  const { name } = req.body || req.query;
  if (name) {
    if (name.trim().match(pattern) !== null) {
      return next();
    }
    return res.status(400).json({ message: 'Provided `name` field is not valid. Valid `name` contains at least 2 latin characters or numbers' });
  }
  if (isRequired) {
    return res.status(400).json({ message: 'There is no `name` field. `name` is a required field' });
  }
  return next();
};
