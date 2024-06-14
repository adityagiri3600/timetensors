const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: String,
    ttid: String,
    date: Date,
    data: String,
});

const log = mongoose.model('Log', logSchema);

module.exports = log;