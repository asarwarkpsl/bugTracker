var Project = require('../models/project');



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
    Project.find({}, (err, projects) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(200).json(projects);
    });
};

exports.addProject = function (req, res) {
    if (!req.params.name || !req.params.desc) {
        return res.status(400).json({ 'msg': 'You must set Project name & description!' });
    }

    var newProject = project(req.params);
    newProject.created_at = Date().Date;
    newProject.created_by = req.user.id;

    newProject.save((err, project) => {
        if (err || !project) {
            return res.status(400).json(err);
        }

        return res.status(200).json(project);
    });
};

exports.updateProject = function (req, res) {

};

exports.deleteProject = function (req, res) {

};

exports.deleteComponent = function (req, res) {

};