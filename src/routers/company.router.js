const { Router } = require('express');
const controller = require('../controllers/company.controller');

const router = Router();

router.post('/', controller.addNew);
router.get('/', controller.getAll);
router.get('/:adminId', controller.getForAdmin);
router.delete('/:id', controller.delete);
router.patch('/:id', controller.update);

module.exports = router;
