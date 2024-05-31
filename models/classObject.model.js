const mongoose = require('mongoose');

const classObjectSchema = new mongoose.Schema({
    classid: String,
    Name: String
});

const classObject = mongoose.model('ClassObject', classObjectSchema);

module.exports = classObject;