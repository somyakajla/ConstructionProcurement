const mongoose = require('mongoose');
const _ = require('lodash');

const ProjectBid = mongoose.model('ProjectBid');

/**
 * create new project
 * /createProject  
 */
module.exports.bidProject = (req, res, next) => {
    var projectBid = new ProjectBid();
    projectBid.projectName = req.body.projectName;
    projectBid.contractorEmail = req.body.contractorEmail;
    projectBid.startDate = req.body.startDate;
    projectBid.endDate = req.body.endDate;
    projectBid.city = req.body.city;
    projectBid.state = req.body.state;
    projectBid.contractorName = req.body.contractorName;
    projectBid.phoneNumber = req.body.phoneNumber;
    projectBid.budget = req.body.budget;
    projectBid.bidStatus = 'applied';
    projectBid.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

/**
 * get big project
 * /project/{id}
 */
module.exports.getBidProject = (req, res, next) => {
    console.log("********inside project bid ******** " + req.query.contractorEmail + "and project Name" +req.query.projectName);
    ProjectBid.find({ contractorEmail: req.query.contractorEmail , projectName: req.query.projectName},
        (err, projectBid) => {
            if (err)
                return res.status(404).json( 'project bid could not found.' );
            else
                return res.status(200).json(projectBid);
        }
    );
}

/**
 * get bid projects
 * /projects
 */
module.exports.getBidProjects = (req, res, next) => {
    console.log("********inside projects bid ******** " + req.query.contractorEmail );
    ProjectBid.find({ contractorEmail: req.query.contractorEmail},
        (err, projectBid) => {
            if (err)
                return res.status(404).json('projects are not found.');
            else
                return res.status(200).json(projectBid);
        }
    );
}
/**
 * update project
 * /updateProject/{projectId}
 */
module.exports.updateBidProject = (req, res, next) => {
    console.log("********inside update bid project ******** " + req.query.projectName+"and contractor email"+req.query.contractorEmail);
    if (!req.body) {
        return res.status(400).send({
            message: "project bid can not be empty"
        });
    }

    ProjectBid.findOne({projectName: req.query.projectName, contractorEmail: req.query.contractorEmail},  (err, projectBid) =>{
        if (err)
            res.send(err);
        projectBid.contractorEmail = req.body.contractorEmail;
        projectBid.startDate = req.body.startDate;
        projectBid.endDate = req.body.endDate;
        projectBid.city = req.body.city;
        projectBid.state = req.body.state;
        projectBid.ontractorName = req.body.ontractorName;
        projectBid.phoneNumber = req.body.phoneNumber;
        projectBid.budget = req.body.budget;
        projectBid.bidStatus = req.body.bidStatus;
        projectBid.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'project bid info updated',
                data: project
            });
        });
    });
};

// Handle delete contact
module.exports.deleteBidProject = (req, res) => {
    ProjectBid.remove({
        contractorEmail: req.query.contractorEmail , projectName: req.query.projectName
    }, function (err, projectBid) {
        if (err)
            return res.status(404).json( 'project bid could not be deleted.' );
        else
            return res.status(200).json('project bid deleted');
    });
};