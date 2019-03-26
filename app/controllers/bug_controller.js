var Bug = require('../models/bug');
var Component = require('../models/component');


exports.getBug = function (req, res) {

};

exports.getBugs = function (req, res) {
    if (!req.params.componentId) {
        return res.status(400).json({ 'msg': 'You must set Component ID' });
    }

    Component.findById(req.params.componentId, (err, component) => {
        if (err || !component) {
            return res.status(400).json(err);
        }

        return res.status(400).json(component.bugs)
    });
};

exports.addBug = function (req, res) {
    if (!req.params.componentId) {
        return res.status(400).json({ 'msg': 'You must set Component ID' });
    }

    if (!req.body.name || !req.body.desc) {
        return res.status(400).json({ 'msg': 'You must set Name & Desc of bug' });
    }

    var newBug = Bug(req.body);
    newBug.component = req.params.id;

    newBug.save((err, bug) => {
        if (err || !bug) {
            return res.status(400).json(err);
        }

        Component.findByIdAndUpdate(req.params.componentId, { $push: { bugs: bug } }, (err, component) => {
            if (err || !component) {
                return res.status(400).json(err);
            }

        });

        return res.status(200).json(bug);
    });

};

exports.updateBug = function (req, res) {
    if (!req.params.id) {
        return res.status(400).json({ 'msg': 'You must set Component ID' });
    }

    Bug.findByIdAndUpdate(req.params.id,req.body,{new:true}, (err, bug) => {
        if (err || !bug) {
            return res.status(400).json(err);
        }

        return res.status(400).json(bug)
    });
};

exports.deleteBug = function (req, res) {

};