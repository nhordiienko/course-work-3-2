const { Router } = require('express');
const { team } = require('../controllers');
const { team: { getCompanyId } } = require('../middleware');

const router = Router();

router.post('/', getCompanyId, team.addNew);
router.delete('/:id', team.delete);
router.get('/company', getCompanyId, team.getByCompanyId);
router.patch('/user/:oldId/:newId', team.changeUser);

module.exports = router;
