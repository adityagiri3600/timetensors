const mongoose = require('mongoose');

const classObjectSchema = new mongoose.Schema({
    classid: String,
    editCode: String,
    Name: String,
    color: String,
    Properties: [{Name: String, Value: String, Shown: Boolean, iconName: String}],
});

const classObject = mongoose.model('ClassObject', classObjectSchema);

module.exports = classObject;