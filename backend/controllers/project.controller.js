const mongoose = require('mongoose');
const _ = require('lodash');

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
    project.save((err) => {
        if (!err)
            return res.status(200).json({ status: true, message: 'project is created' });
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
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
    console.log('is it here ');
    Project.findOne({ projectId: req.params.projectId },
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
    Project.find((err, projects) => {
        if (err)
            return res.status(404).json({ status: false, message: 'projects are not found.' });
        else
            return res.status(200).json({ status: true, projects: projects });
    }
    );
}
/**
 * update project
 * /updateProject/{projectId}
 */
module.exports.updateProject = (req, res, next) => {
    Project.findOne({ _id: req.params._id },
        (err, project) => {
            if (err)
                res.send(err);
            console.log(req.body.ownerEmail);
            // project.ownerEmail = req.body.ownerEmail ? req.body.ownerEmail : project.ownerEmail;
            // project.startDate = req.body.startDate ? req.body.startDate : project.startDate;
            // project.endDate = req.body.endDate ? req.body.endDate : project.endDate;
            // project.city = req.body.city ? req.body.city : project.city;
            // project.state = req.body.state ? req.body.state : project.state;
            // project.contactName = req.body.contactName ? req.body.contactName : project.contactName;
            // project.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : project.phoneNumber;
            // project.budget = req.body.budget ? req.body.budget : project.budget;

            // // save the contact and check for errors
            // project.save((err) => {
            //     if (err)
            //         return res.status(404).json({ status: false, message: 'project could not be found.' });
            //     else
            //         return res.status(200).json({ status: true, message: 'project is updated' });
           // });
        });
};

// Handle delete contact
module.exports.deleteProject = (req, res) => {
    Project.remove({
        projectId: req.params.projectId
    }, function (err, project) {
        if (err)
            return res.status(404).json({ status: false, message: 'project could not be deleted.' });
        else
            return res.status(200).json({ status: true, message: 'project deleted' });
    });
};