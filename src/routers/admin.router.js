const express = require('express');
const { admin } = require('../controllers');

const router = express.Router();

router.get('/', admin.get);
router.post('/', admin.addNew);
router.delete('/', admin.delete);
router.patch('/', admin.update);
router.login('/', admin.login);

module.exports = router;
