const mongoose = require('mongoose');
const _ = require('lodash');
//import { Project } from "../models/project.model";

const Project = mongoose.model('Project');

/**
 * create new project
 * /createProject  
 */
module.exports.createProject = (req, res, next) => {
    var project = new Project();
    project.projectName = req.body.projectName;
    project.ownerEmail = req.body.ownerEmail;
    project.startDate = req.body.startDate;
    project.endDate = req.body.endDate;
    project.city = req.body.city;
    project.state = req.body.state;
    project.contactName = req.body.contactName;
    project.phoneNumber = req.body.phoneNumber;
    project.budget = req.body.budget;
    project.status = req.body.status;
    project.save((err) => {
        if (!err)
            return res.status(200).json({ status: true, message: 'project is created' });
        else {
            if (err.code == 11000)
                res.status(422).send(['Project Name already exists, please use the unique name']);
            else
                return next(err);
        }

    });
}

/**
 * get project
 * /project/{id}
 */
module.exports.getProject = (req, res, next) => {
    console.log("******* in side get one project with name ********::: " + req.query.projectName);
    Project.find({ projectName: req.query.projectName },
        (err, project) => {
            if (err)
                return res.status(404).json({ status: false, message: 'project does not found.' });
            else
                return res.status(200).json({ status: true, project: project });
        }
    );
}

/**
 * get open project
 * /project/{id}
 */
module.exports.getOpenProjects = (req, res, next) => {
    console.log("******* in side get open project with name ********::: " + req.query.projectName);
    Project.find({ status: req.query.status },
        (err, project) => {
            if (err)
                return res.status(404).json({ status: false, message: 'project does not found.' });
            else
                return res.status(200).json({ status: true, project: project });
        }
    );
}

/**
 * get projects
 * /projects
 */
module.exports.getProjects = (req, res, next) => {
    console.log("********inside projects ******** " + req.query.ownerEmail);
    Project.find({ ownerEmail: req.query.ownerEmail },
        (err, project) => {
            if (err)
                return res.status(404).json({ status: false, message: 'projects are not found.' });
            else
                return res.status(200).json({ status: true, project: project });
        }
    );
}



/**
 * update project
 * /updateProject/{projectId}
 */
module.exports.updateProject = (req, res, next) => {
    console.log("********inside update project ******** " + req.body.projectName);
    if (!req.body) {
        return res.status(400).send({
            message: "project content can not be empty"
        });
    }

    Project.findOne({projectName: req.query.projectName},  (err, project) =>{
        if (err)
            res.send(err);
        project.state = req.body.state;
        project.ownerEmail = req.body.ownerEmail;
        project.startDate = req.body.startDate;
        project.endDate = req.body.endDate;
        project.city = req.body.city;
        project.state = req.body.state;
        project.contactName = req.body.contactName;
        project.phoneNumber = req.body.phoneNumber;
        project.budget = req.body.budget;
        project.status = req.body.status;
        project.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'project Info updated',
                data: project
            });
        });
    });
};

// Handle delete contact
module.exports.deleteProject = (req, res) => {
    Project.remove({
        projectName: req.query.projectName
    }, function (err, project) {
        if (err)
            return res.status(404).json({ status: false, message: 'project could not be deleted.' });
        else
            return res.status(200).json({ status: true, message: 'project deleted' });
    });
};