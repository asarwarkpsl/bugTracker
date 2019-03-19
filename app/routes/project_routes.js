var express = require('express');
var router = express.Router();
var projectCtrl = require('../controllers/project_controller');
var User = require('../models/user');

// var ConnectRoles = require('connect-roles');
// var user = new ConnectRoles({ async: true });

// user.use('boards', req => {
//     let userId = req.user.id;

//     let promise = new Promise((resolve) => {
//         User.findById(userId, 'boards', (err, user) => {
//             let index = user.boards.indexOf(req.params.id);
//             if (index == -1) {
//                 return resolve(false);
//             } else {
//                 return resolve(true);
//             }
//         });
//     });
//     return promise;
// });

// router.use(user.middleware());

router.post('/',projectCtrl.addProject);
router.get('/',projectCtrl.getProjects);

//router.get('/:id', user.can('boards'),projectCtrl.getProject);
router.get('/:id',projectCtrl.getProject);

//router.put('/:id', user.can('boards'),projectCtrl.updateProject);
router.put('/:id',projectCtrl.updateProject);

//router.delete('/:id', user.can('boards'),projectCtrl.deleteProject);
router.delete('/:id',projectCtrl.deleteProject);

//router.delete('/:id/:componentId', user.can('boards'),projectCtrl.deleteComponent);
router.delete('/:id/:componentId',projectCtrl.deleteComponent);