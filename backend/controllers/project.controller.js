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
    project.status = 'applied';
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
    Project.findOne({ projectName: req.query.projectName },
        (err, project) => {
            if (err)
                return res.status(404).json({ status: false, message: 'project does not found.' });
            else
                return res.status(200).json(project);
        }
    );
}

/**
 * get open project
 * /project/{id}
 */
module.exports.getOpenProjects = (req, res, next) => {
    console.log("******* in side get open project with open status ********::: " + req.query.projectName);
    Project.find({ status: req.query.status },
        (err, project) => {
            if (err)
                return res.status(404).json({ status: false, message: 'project does not found.' });
            else
                return res.status(200).json(project);
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
                return res.status(200).json(project);
        }
    );
}

/**
 * update project
 * /updateProject/{projectId}
 */
module.exports.updateProject = (req, res, next) => {
    console.log("********inside update project ******** " + req.query.projectName);
    if (!req.body) {
        return res.status(400).send({
            message: "project content can not be empty"
        });
    }
    var options = { multi: false };
    var query = { projectName: req.query.projectName };
    var x = {budget : 765, state: req.body.status, ownerEmail: req.body.ownerEmail,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        city: req.body.city,
        state: req.body.state,
        contactName: req.body.contactName,
        phoneNumber: req.body.phoneNumber,
        budget: req.body.budget,
        status: req.body.status
    }
    try {
        Project.update(query, x, options,
            function (err) {
                if (err)
                    return res.json(err);
            });
            return res.json({message: 'project updated'});
    } 
    catch(e)
    {
        return res.json(e);
    }
    
};

// Handle delete contact
module.exports.deleteProject = (req, res) => {
    console.log("********inside delete project ******** " + req.body.projectName);
    Project.remove({
        projectName: req.query.projectName
    }, function (err, project) {
        if (err)
            return res.status(404).json('project could not be deleted.' );
        else
            return res.status(200).json('project deleted' );
    });
};