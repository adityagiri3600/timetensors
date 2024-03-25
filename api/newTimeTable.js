const express = require('express');
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

router.post('/', (req, res) => {
    const ttName = req.body.ttName;
    const data = req.body.classes;
    const editCode = req.body.editCode;

    const folderName = Math.random().toString(36).substring(7);
    fs.mkdirSync(`./api/data/${folderName}`);
    fs.writeFileSync(`./api/data/${folderName}/metadata.json`, JSON.stringify({ttName: ttName, editCode: editCode}));

    const csvWriter = createCsvWriter({
        path: `./api/data/${folderName}/timetable.csv`,
        header: [
            { id: 'Day', title: 'Day' },
            { id: 'Subject', title: 'Subject' },
            { id: 'Start', title: 'Start' },
            { id: 'End', title: 'End' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => {
            console.log(`New timetable added: ${folderName}`);
            res.status(200).json({ ttRoute: folderName});
        })
        .catch(error => {
            console.error('Error writing to CSV file:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;