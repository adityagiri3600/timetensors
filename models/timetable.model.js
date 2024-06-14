const mongoose = require('mongoose');
let classObject = require('./classObject.model');

const timetableSchema = new mongoose.Schema({
    ttid: String,
    ttName: String,
    description: String,
    creator: String,
    editCode: String,
    classes: [{
        Day: String,
        classid: String,
        Start: String,
        End: String
    }],
    classObjects: [classObject.schema],
    events: [{
        date: Date,
        event: String
    }],
    classesAtSpecificDate: [{
        date: Date,
        classes: [{
            Day: String,
            classid: String,
            Start: String,
            End: String
        }]
    }],
    extraClasses: [{
        date: Date,
        classid: String,
        Start: String,
        End: String
    }],
});

const timetable = mongoose.model('TimeTable', timetableSchema);

module.exports = timetable;