/* eslint-disable no-unused-vars */
module.exports = (error, req, res, next) => {
  switch (error.name) {
    case 'CastError':
      res.status(404).json({ message: 'There is no fields found' });
      break;
    case 'MongoError':
      res.status(409).json({ message: `Some unique field is allreay claimed. Check ${req.protocol}://${req.get('host')} reference to get more info` });
      break;
    default:
      console.error(error);
      res.status(500).json(error);
      break;
  }
};
