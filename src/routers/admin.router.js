const express = require('express');
const { admin } = require('../controllers');

const router = express.Router();

router.get('/:id', admin.get);
router.post('/', admin.addNew);
router.delete('/:id', admin.delete);
router.patch('/:id', admin.update);
router.post('/login', admin.login);

module.exports = router;
