const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    editCodes: [{
        id: String,
        code: String,
    }],
    recentlyViewed: [String],
});

const user = mongoose.model('User', userSchema);

module.exports = user;