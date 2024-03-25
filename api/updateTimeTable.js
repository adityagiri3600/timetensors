const express = require('express');
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

router.post('/', (req, res) => {
    const ttName = req.body.ttName;
    const data = req.body.classes;
    const ttRoute = req.body.ttRoute;
    const editCode = req.body.editCode;

    fs.readFile(`./api/data/${ttRoute}/metadata.json`, 'utf8', (err, metadataData) => {
        if (err) {
            console.error('Error reading metadata:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const metadata = JSON.parse(metadataData);
        if (metadata.editCode !== editCode) {
            console.error('Invalid edit code');
            res.status(400).json({ error: 'Invalid edit code' });
            return;
        }

        fs.writeFileSync(`./api/data/${ttRoute}/metadata.json`, JSON.stringify({ ttName: ttName, editCode: editCode }));

        const csvWriter = createCsvWriter({
            path: `./api/data/${ttRoute}/timetable.csv`,
            header: [
                { id: 'Day', title: 'Day' },
                { id: 'Subject', title: 'Subject' },
                { id: 'Start', title: 'Start' },
                { id: 'End', title: 'End' }
            ]
        });

        csvWriter.writeRecords(data)
            .then(() => {
                console.log(`Time table updated: ${ttRoute}`);
                res.status(200).json({});
            })
            .catch(error => {
                console.error('Error writing to CSV file:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    });
});


module.exports = router;