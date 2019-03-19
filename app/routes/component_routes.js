var express = require('express');
var router = express.Router();
var cmptCtrl = require('../controllers/component_controller');

router.post('/:projId',cmptCtrl.addComponent);
router.get('/:id',cmptCtrl.getComponent);
router.get('/:projId',cmptCtrl.getComponents);
router.put('/:id',cmptCtrl.updateComponent);

module.exports = router;