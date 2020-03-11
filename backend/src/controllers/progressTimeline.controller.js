const mongoose = require('mongoose');
const _ = require('lodash');

const ProgressTimeline = mongoose.model('ProgressTimeline');

/**
 * create new project
 * /createProgressTimeline  
 */
module.exports.ProgressTimeline = (req, res, next) => {
    var progressTimeline = new ProgressTimeline();
    progressTimeline.projectName = req.body.projectName;
    progressTimeline.contractorEmail = req.body.contractorEmail;
    progressTimeline.description = req.body.description;
    progressTimeline.currentTime = req.body.currentTime;
    progressTimeline.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['error']);
            else
                return next(err);
        }

    });
}

/**
 * get progress timeline of project by project Name
 * /getProjectTimelineList
 */
module.exports.getprojectTimelineList = (req, res, next) => {
    console.log("********inside project bid to fetch project bid list******** " + "project Name" +req.query.projectName);
    ProgressTimeline.find({ projectName: req.query.projectName },
        (err, ProgressTimeline) => {
            if (err)
                return res.status(404).json( 'project timeline could not found.' );
            else
                return res.status(200).json(ProgressTimeline);
        }
    );
}   
