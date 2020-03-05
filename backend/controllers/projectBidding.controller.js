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
    projectBid.bidStatus = req.body.bidStatus;
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
 * get project
 * /project/{id}
 */
module.exports.getBidProject = (req, res, next) => {
    ProjectBid.findOne({ projectBidId: req.params.projectBidId },
        (err, projectBid) => {
            if (err)
                return res.status(404).json({ status: false, message: 'project bid could not found.' });
            else
                return res.status(200).json({ status: true, projectBid: projectBid });
        }
    );
}

/**
 * get projects
 * /projects
 */
module.exports.getBidProjects = (req, res, next) => {
    ProjectBid.findAll((err, projectsbid) => {
        if (err)
            return res.status(404).json({ status: false, message: 'projects bidding could not be found.' });
        else
            return res.status(200).json({ status: true, projectsbid: projectsbid });
    }
    );
}
/**
 * update project
 * /updateProject/{projectId}
 */
module.exports.updateBidProject = (req, res, next) => {
    ProjectBid.findById({ projectBidId: req.params.projectBidId },
        (err, projectBid) => {
            if (err)
                res.send(err);
            projectBid.contractorEmail = req.body.contractorEmail ? req.body.contractorEmail : projectBid.contractorEmail;
            projectBid.startDate = req.body.startDate ? req.body.startDate : projectBid.startDate;
            projectBid.endDate = req.body.endDate ? req.body.endDate : projectBid.endDate;
            projectBid.city = req.body.city ? req.body.city : projectBid.city;
            projectBid.state = req.body.state ? req.body.state : projectBid.state;
            projectBid.contractorName = req.body.contractorName ? req.body.contractorName : projectBid.contractorName;
            projectBid.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : projectBid.phoneNumber;
            projectBid.budget = req.body.budget ? req.body.budget : projectBid.budget;

            // save the contact and check for errors
            projectBid.save((err) => {
                if (err)
                    return res.status(404).json({ status: false, message: 'project bid could not be found.' });
                else
                    return res.status(200).json({ status: true, message: 'project bidding has been updated' });
            });
        });
};

// Handle delete contact
module.exports.deleteBidProject = (req, res) => {
    ProjectBid.remove({
        projectBidId: req.params.projectBidId
    }, function (err, projectBid) {
        if (err)
            return res.status(404).json({ status: false, message: 'project bid could not be deleted.' });
        else
            return res.status(200).json({ status: true, message: 'project bid deleted' });
    });
};