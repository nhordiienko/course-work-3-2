const express = require('express');
const { iot } = require('../controllers');
const { user: { releaseToken } } = require('../middleware');

const router = express.Router();

router.get('/:id', releaseToken, iot.get);

module.exports = router;
