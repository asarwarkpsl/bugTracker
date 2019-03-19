var express = require('express');
var router = express.Router();
var bugCtrl = require('../controllers/bug_controller');

router.post('/:componentId',bugCtrl.addBug);
router.get('/:id',bugCtrl.getBug);
router.get('/:componentId',bugCtrl.getBugs);
router.put('/:id',bugCtrl.updateBug);
router.delete('/:id',bugCtrl.deleteBug);

module.exports = router;