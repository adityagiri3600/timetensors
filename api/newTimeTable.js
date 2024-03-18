const express = require('express');
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

router.post('/', (req, res) => {
    const ttName = req.body.ttName;
    const data = req.body.classes;

    const csvWriter = createCsvWriter({
        path: `./client/public/data/${ttName}.csv`,
        header: [
            { id: 'day', title: 'Day' },
            { id: 'subject', title: 'Subject' },
            { id: 'start', title: 'Start' },
            { id: 'end', title: 'End' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => {
            console.log('CSV file created successfully');
            res.status(200).json(req.body);
        })
        .catch(error => {
            console.error('Error writing to CSV file:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;