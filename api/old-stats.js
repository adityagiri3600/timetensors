const e = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
    const ip = "ip" + req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var errs = []

    fs.readFile('./ips.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
            errs.push(err);
        } else {
            const ips = JSON.parse(data);

            ips.push(ip);

            fs.writeFile('./ips.json', JSON.stringify(ips), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                    errs.push(err);
                }
            });
        }
    });

    res.status(200).send('IP logged' + errs.join(' '));
});

module.exports = router;