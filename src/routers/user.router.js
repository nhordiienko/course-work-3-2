const express = require('express');
const { user } = require('../controllers');
const { user: { releaseToken } } = require('../middleware');

const router = express.Router();

router.get('/:id', releaseToken, user.get);
router.post('/', user.addNew);
router.delete('/:id', releaseToken, user.delete);
router.patch('/activity/:id', releaseToken, user.updateActivity);
router.patch('/info/:id', releaseToken, user.update);
router.post('/login', user.login);

module.exports = router;
