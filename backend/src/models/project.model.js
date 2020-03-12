const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({

    projectName: {
        type: String,
        required: 'Company name can\'t be empty',
        unique: true
    },
    ownerEmail: {
        type: String,
        required: 'Email can\'t be empty'
    },
    startDate: {
        type: Date,
        required: 'start date can\'t be empty',
        min: [Date.now(),'atleast today\'s date']
    },
    endDate: {
        type: Date,
        required: 'end date can\'t be empty'
    },
    city: {
        type: String,
        required: 'city can\'t be empty',
    },
    state: {
        type: String,
        required: 'state can\'t be empty',
    },
    contactName: {
        type: String,
        required: 'contact person name can\'t be empty',
    },
    phoneNumber: {
        type: String,
        required: 'phoneNumber can\'t be empty'
    },
    budget: {
        type: Number,
        required: 'budget can\'t be empty'
    },
    status:{
        type: String,
        required: 'status can\'t be empty'
    }

});

/**
 * custom validation of project name 
 * only combination number and characters are allowed
 */
projectSchema.path('projectName').validate((val) => {
    projectNameRegex = /^[0-9a-zA-Z]+$/;
    return projectNameRegex.test(val);
}, 'Invalid project-name.');

 /**
  * validate owner email id
  * peroper email id format
  */
 projectSchema.path('ownerEmail').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

/**
 * validate phone number of owner/contact person
 * only 10 digits and numeric number are allowed
 */
projectSchema.path('phoneNumber').validate((val) => {
    phoneRegex = /^\d{10}$/;
    return phoneRegex.test(val);
}, 'Invalid phone-number.');

/**
 * validate budget 
 * only numbers are allowed
 */
projectSchema.path('budget').validate((val) => {
    budgetRegex = /^[-+]?[0-9]+$/;
    return budgetRegex.test(val);
}, 'Invalid amount.');


mongoose.model('Project', projectSchema);