const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var ProgressTimelineSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: 'project name can\'t be empty',
    },
    contractorEmail: {
        type: String,
        required: 'Email can\'t be empty',

    },
    currentTime: {
        type: String,
        required: 'start date can\'t be empty',

    },
    description: {
        type: String,
        required: 'description can\'t be empty'
    }
});

/**
 * custom validation of project name 
 * only combination number and characters are allowed
 */
ProgressTimelineSchema.path('projectName').validate((val) => {
    projectNameRegex = /^[0-9a-zA-Z]+$/;
    return projectNameRegex.test(val);
}, 'Invalid project-name.');

/**
 * validate owner email id
 * peroper email id format
 */
ProgressTimelineSchema.path('contractorEmail').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('ProgressTimeline', ProgressTimelineSchema);