var Component = require('../models/component');
var Project = require('../models/project');



exports.getComponents = function (req, res) {
    if (!req.params.projId) {
        return res.status(400).json({ 'msg': 'You must set Project ID' });
    }

    //  Project.findById(req.params.projId)

    Component.find({ project: req.params.projId })
        //.populate([{ 'path': 'bugs', 'select': 'name desc' }])
        .exec((err, components) => {
            if (err || !components) {
                return res.status(400).json(err);
            }

            return res.status(200).json(components);
        });
};

exports.getComponent = function (req, res) {
    if (!req.params.projId) {
        return res.status(400).json({ 'msg': 'You must set Project ID' });
    }

    if (!req.params.id) {
        return res.status(400).json({ 'msg': 'You must set Component ID' });
    }

    Component.find({ 'project': req.params.projId }, (err, components) => {
        if (err || !components) {
            return res.status(400).json(err);
        }
        for (var i = 0; i < components.length; i++) {
            var OneComponent = components[i];
            if (OneComponent._id = req.params.id) {
                return res.status(200).json(OneComponent);
            }
        }

        return res.status(400).json({ 'msg': 'Component ID doesnt exists' });
    });
};

exports.addComponent = function (req, res) {
    if (!req.params.projId) {
        return res.status(400).json({ 'msg': 'You must set Project ID' });
    }

    if (!req.body.name || !req.body.desc) {
        return res.status(400).json({ 'msg': 'You must set Name & Desc of bug' });
    }
    
    var newComponent = Component(req.body);

    Project.findByIdAndUpdate(req.params.projId, { $push: { "components": newComponent } }, (err, project) => {
        if (err || !project) {
            return res.status(400).json(err);
        }

        newComponent.project = project._id;

        newComponent.save((err, component) => {
            if (err || !component) {
                return res.status(400).json(err);
            }

            return res.status(200).json(component);

        });

    });
};

exports.updateComponent = function (req, res) {
    if (!req.params.id) {
        return res.status(400).json({ 'msg': 'You must set Component ID' });
    }
    if (req.body.project) {
        return res.status(400).json({ 'msg': 'You cant change the project of a component(as its under progress)' });
    }

    Component.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, component) => {
        if (err || !component) {
            return res.status(400).json(err);
        }

        // if (component.project != req.body.project) {
        //     Project.findByIdAndUpdate(component.project,{new:true}, { $pull: { "components": component } }, (err, project) => {
        //         if (err || !project) {
        //             return res.status(400).json(err);
        //         }

        //         Project.findByIdAndUpdate(req.body.project,{new:true}, { $push: { "components": component } }, (err, project) => {
        //             if (err || !project) {
        //                 return res.status(400).json(err);
        //             }
        //         });
        //     });
        // }

        return res.status(200).json(component);
    });


};