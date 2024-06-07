const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    editCodes: [{
        id: String,
        code: String,
    }],
    recentlyViewed: [String],
    createdTimetables: [String],
});

const user = mongoose.model('User', userSchema);

module.exports = user;