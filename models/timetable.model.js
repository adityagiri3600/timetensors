const mongoose = require('mongoose');
let classObject = require('./classObject.model');

const timetableSchema = new mongoose.Schema({
    ttid: String,
    ttName: String,
    description: String,
    editCode: String,
    viewCode: String,
    classes: [{
        Day: String,
        classid: String,
        Start: String,
        End: String
    }],
    events: [{
        date: Date,
        event: String
    }],
    classesAtSpecificDate: [{
        date: Date,
        classes: [{
            Day: String,
            Subject: String,
            Start: String,
            End: String
        }]
    }],
    classObjects: [classObject.schema]
});

const timetable = mongoose.model('TimeTable', timetableSchema);

module.exports = timetable;