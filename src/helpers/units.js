const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports.encode = (str) => crypto.pbkdf2Sync(str, 'salt', 5, 64, 'sha512');
module.exports.createToken = (email) => jwt.sign({ email }, 'secret', { expiresIn: '1h' });
