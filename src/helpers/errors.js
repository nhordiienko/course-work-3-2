/* eslint-disable no-unused-vars */
module.exports = (error, req, res, next) => {
  console.error(error.errmsg);
  res.status(500).json({ error });
};
