var Project = require('../models/project');
var Component = require('../models/component');

exports.getProject = function (req, res) {
    if (!req.params.id) {
        return res.status(400).json({ 'msg': 'You must set ID of th Project!' });
    }

    Project.findById(req.params.id, (err, project) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(200).json(project);
    });
};

exports.getProjects = function (req, res) {
    
    Project.find({})
    .exec((err, projects) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(200).json({Projects: projects});
    });
};

exports.addProject = function (req, res) {
    if (!req.body.name || !req.body.desc) {
        return res.status(400).json({ 'msg': 'You must set Project name & description!' });
    }

    var newProject = Project(req.body);
    newProject.created_at = Date().Date;
    active_p = true;
    newProject.created_by = req.user.id;

    newProject.save((err, project) => {
        if (err || !project) {
            return res.status(400).json(err);
        }
        User.findByIdAndUpdate(req.user.id, { $push: { projects: project } }).exec();
        return res.status(200).json(project);
    });
};

exports.updateProject = function (req, res) {
    if (!req.body.name || !req.body.desc) {
        return res.status(400).json({ 'msg': 'You must set Project name & description!' });
    }

    Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, project) => {
        if (err || !project) {
            return res.status(400).json(err);
        }

        return res.status(200).json(project);
    });
};

exports.deleteProject = function (req, res) {
    Project.findById(req.params.id, (err, project) => {
        if (err || !project) {
            return res.status(400).json(err);
        }

        for (var i = 0; i < project.components.length; i++) {
            var oneComponent = project.components[i];

            Component.findByIdAndUpdate(oneComponent, { active_p: false }, { new: true }).exec();
        }

        Project.findByIdAndUpdate(project, { active_p: false }, { new: true }, (err, updatedProj) => {
            if (err || !updatedProj) {
                return res.status(400).json(err);
            }
            return res.status(200).json(updatedProj);

        });
    });
};

exports.deleteComponent = function (req, res) {
    return res.status(401).send({ 'msg': 'still working on it' });
};