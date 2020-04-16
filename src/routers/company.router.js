const { Router } = require('express');
const controller = require('../controllers/company.controller');

const router = Router();

router.post('/', controller.addNew);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.delete('/:id', controller.delete);
router.patch('/:id', controller.update);

module.exports = router;
