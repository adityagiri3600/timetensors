const router = require('express').Router();
const { response } = require('express');
let timetable = require('../models/timetable.model');

router.get('/:ttid', (req, res) => {
    const { ttid } = req.params;

    timetable.findOne({ ttid: ttid })
        .then(tt => {
            if (!tt) {
                return res.status(404).json('Timetable not found');
            }
            const timetableData = { ...tt._doc };
            delete timetableData.editCode;
            res.json(timetableData);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/new', (req, res) => {
    const ttid = Math.random().toString(36).substring(7);

    const { ttName, description, editCode, viewCode, classes } = req.body;

    const newTimetable = new timetable({
        ttid,
        ...(ttName && { ttName }),
        ...(description && { description }),
        ...(editCode && { editCode }),
        ...(viewCode && { viewCode }),
        ...(classes && { classes })
    });

    newTimetable.save()
        .then(() => {
            res.json({
                message: `New timetable added ${ttid}`,
                ttRoute: ttid
            });
            console.log(`New timetable added ${ttid}`);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:ttid', (req, res) => {
    const { ttid } = req.params;
    timetable.findOneAndUpdate({ ttid: ttid }, req.body)
        .then(() => {
            res.json('Timetable updated successfully');
            console.log(`Timetable updated: ${ttid}`);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;