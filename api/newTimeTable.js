const express = require('express');
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

router.post('/', (req, res) => {
    const ttName = req.body.ttName;
    const data = req.body.classes;
    const ttCode = req.body.ttCode;

    const folderName = Math.random().toString(36).substring(7);
    fs.mkdirSync(`./api/data/${folderName}`);
    fs.writeFileSync(`./api/data/${folderName}/metadata.json`, JSON.stringify({ttName: ttName, ttCode: ttCode}));

    const csvWriter = createCsvWriter({
        path: `./api/data/${folderName}/timetable.csv`,
        header: [
            { id: 'day', title: 'Day' },
            { id: 'subject', title: 'Subject' },
            { id: 'start', title: 'Start' },
            { id: 'end', title: 'End' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => {
            console.log(`New timetable added: ${folderName}`);
            res.status(200).json(req.body);
        })
        .catch(error => {
            console.error('Error writing to CSV file:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;