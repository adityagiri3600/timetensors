const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.get('/api/data/:section', (req, res) => {
    res.sendFile(path.join(__dirname, `/api/data/${req.params.section}`));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use('/api/newTimeTable', require('./api/newTimeTable'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});