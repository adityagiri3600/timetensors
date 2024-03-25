const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.get('/api/data/:ttRoute', (req, res) => {
    if (!fs.existsSync(path.join(__dirname, `/api/data/${req.params.ttRoute}/timetable.csv`))) {
        res.status(404).send('Not found');
        return;
    }
    res.sendFile(path.join(__dirname, `/api/data/${req.params.ttRoute}/timetable.csv`));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use('/api/newTimeTable', require('./api/newTimeTable'));
app.use('/api/updateTimeTable', require('./api/updateTimeTable'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});