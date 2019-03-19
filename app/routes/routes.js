var express = require('express');
var passport = require('passport');

var router = express.Router();

// router.use('/boards', passport.authenticate('jwt', { session: false }), require('./board_routes'));
// router.use('/users', require('./user_routes'));
// router.use('/tasks', passport.authenticate('jwt', { session: false }), require('./task_routes'));
// router.use('/invitations', passport.authenticate('jwt', { session: false }), require('./invitation_routes'));
// router.use('/aws', passport.authenticate('jwt', { session: false }), require('./aws_routes'));

router.use('/users', require('./user_routes'));
router.use('/projects',passport.authenticate('jwt',{session:false}),require('./'));
router.use('/componants',passport.authenticate('jwt',{session:false}),require('./'));
router.use('/bugs',passport.authenticate('jwt',{session:false}),require('./'));


module.exports = router;
