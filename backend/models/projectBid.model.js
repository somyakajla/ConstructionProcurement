const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var projectBidSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: 'Company name can\'t be empty',
    },
    contractorEmail: {
        type: String,
        required: 'Email can\'t be empty',
        
    },
    startDate: {
        type: Date,
        required: 'start date can\'t be empty',
        
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
    contractorName: {
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
    bidStatus: {
        type: String,
        required: 'bid status can\'t be empty'
    }

});

/**
 * custom validation of project name 
 * only combination number and characters are allowed
 */
projectBidSchema.path('projectName').validate((val) => {
    projectNameRegex = /^[0-9a-zA-Z]+$/;
    return projectNameRegex.test(val);
}, 'Invalid project-name.');

 /**
  * validate owner email id
  * peroper email id format
  */
 projectBidSchema.path('contractorEmail').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

/**
 * validate phone number of owner/contact person
 * only 10 digits and numeric number are allowed
 */
projectBidSchema.path('phoneNumber').validate((val) => {
    phoneRegex = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
    return phoneRegex.test(val);
}, 'Invalid phone-number.');

/**
 * validate budget 
 * only numbers are allowed
 */
projectBidSchema.path('budget').validate((val) => {
    budgetRegex = /^[-+]?[0-9]+$/;
    return budgetRegex.test(val);
}, 'Invalid amount.');

mongoose.model('ProjectBid', projectBidSchema);