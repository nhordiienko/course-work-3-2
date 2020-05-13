const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports.encode = (str) => crypto.pbkdf2Sync(str, 'salt', 5, 64, 'sha512');
module.exports.createToken = (id) => jwt.sign({ id }, 'secret', { expiresIn: '7d' });
module.exports.getActiveTimeForToday = ({ from, to }) => {
  const today = new Date(`${new Date().getMonth() + 1}.${new Date().getDate()}.${new Date().getFullYear()}`).getTime();
  return {
    from: new Date(today + from).getTime(),
    to: new Date(today + to).getTime(),
  };
};
module.exports.calculateTime = (hours, { from, to }) => {
  const proportion = [4, 1];
  return {
    from: (hours.from * proportion[0] + from * proportion[1]) / (proportion[0] + proportion[1]),
    to: (hours.to * proportion[0] + to * proportion[1]) / (proportion[0] + proportion[1]),
  };
};
