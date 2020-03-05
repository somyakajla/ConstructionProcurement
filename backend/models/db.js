const mongoose = require('mongoose');

var options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(process.env.MONGODB_URI, options, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./project.model');
require('./projectBid.model');