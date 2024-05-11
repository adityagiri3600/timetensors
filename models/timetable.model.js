const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    ttid: String,
    ttName: String,
    description: String,
    editCode: String,
    viewCode: String,
    classes: [{
        Day: String,
        Subject: String,
        Start: String,
        End: String
    }],
    events: [{
        date: Date,
        event: String
    }]
});

const timetable = mongoose.model('TimeTable', timetableSchema);

module.exports = timetable;