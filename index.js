const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/timetrack');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established');
});

app.use('/api/user', require('./api/user'));
app.use('/api/signup', require('./api/signup'));
app.use('/api/login', require('./api/login'));
app.use('/api/timetable', require('./api/timetable'));
app.use('/api/classObject', require('./api/classObject'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});