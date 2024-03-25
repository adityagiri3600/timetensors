const express = require('express');
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

router.post('/', (req, res) => {
    const ttName = req.body.ttName;
    const data = req.body.classes;
    const ttCode = req.body.ttCode;

    fs.writeFileSync(`./api/data/${ttCode}/metadata.json`, JSON.stringify({ttName: ttName, ttCode: ttCode}));

    const csvWriter = createCsvWriter({
        path: `./api/data/${ttCode}/timetable.csv`,
        header: [
            { id: 'Day', title: 'Day' },
            { id: 'Subject', title: 'Subject' },
            { id: 'Start', title: 'Start' },
            { id: 'End', title: 'End' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => {
            console.log(`Time table updated: ${ttCode}`);
            res.status(200).json({});
        })
        .catch(error => {
            console.error('Error writing to CSV file:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;