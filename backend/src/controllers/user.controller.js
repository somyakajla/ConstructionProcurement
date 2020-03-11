const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.companyName = req.body.companyName;
    user.email = req.body.email;
    user.password = req.body.passcode;
    user.userType = req.body.userType
    user.city = req.body.city
    user.state = req.body.state
    user.contactName = req.body.contactName
    user.phoneNumber = req.body.phoneNumber
    user.save((err, doc) => {
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

module.exports.login = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "email": user.email,  "type": user.userType, "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ message: 'User record not found.' });
            else
                return res.status(200).json({user : user });
        }
    );
}

module.exports.users = (req, res, next) =>{
    User.find({}, 
        (err, users) => {
            if (!users)
                return res.status(404).json({ message: 'Users record not found.' });
            else
                return res.status(200).json(users);
        }
    );
}