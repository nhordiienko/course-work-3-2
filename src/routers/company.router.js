const { Router } = require('express');
const { company } = require('../controllers');
const { companyMiddleware: { checkName } } = require('../middleware');

const router = Router();

router.post('/', checkName(true), company.addNew);
router.get('/', company.getAll);
router.get('/:id', company.get);
router.delete('/:id', company.delete);
router.patch('/:id', checkName(false), company.update);

module.exports = router;
