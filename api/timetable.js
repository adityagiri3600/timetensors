const router = require('express').Router();
const { response } = require('express');
let timetable = require('../models/timetable.model');
const { read } = require('fs');

router.get('/:ttid', async (req, res) => {
    try {
        const { ttid } = req.params;
        const tt = await timetable.findOne({ ttid });

        if (!tt) {
            return res.status(404).json('Timetable not found');
        }

        const timetableData = { ...tt._doc };
        delete timetableData.editCode;
        res.json(timetableData);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

router.post('/new', async (req, res) => {
    try {
        const ttid = Math.random().toString(36).substring(7);

        const newTimetable = new timetable({
            ttid,
            ...req.body
        });

        await newTimetable.save();

        res.json({
            message: `New timetable added ${ttid}`,
            ttRoute: ttid
        });
        console.log(`New timetable added ${ttid}`);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});


router.post('/update/:ttid', async (req, res) => {
    const { ttid } = req.params;

    try {
        const tt = await timetable.findOne({ ttid });

        if (!tt) {
            return res.status(404).json('Timetable not found');
        }

        if (tt.editCode !== req.body.editCode) {
            return res.status(401).json('Invalid edit code');
        }

        delete req.body.editCode;
        await timetable.findOneAndUpdate({ ttid }, req.body);
        res.json('Timetable updated successfully');
        console.log(req.body);
        console.log(`Timetable updated: ${ttid}`);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

module.exports = router;