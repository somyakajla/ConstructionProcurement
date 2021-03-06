const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: 'Company name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    userType: {
        type: String,
        required: 'userType can\'t be empty',
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
        required: 'contactName can\'t be empty',
    },
    phoneNumber: {
        type: String,
        required: 'phoneNumber can\'t be empty'
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

/**
 * validate phone number of owner/contact person
 * only 10 digits and numeric number are allowed
 */
userSchema.path('phoneNumber').validate((val) => {
    phoneRegex = /^\d{10}$/;
    return phoneRegex.test(val);
}, 'Invalid phone-number.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}


mongoose.model('User', userSchema);