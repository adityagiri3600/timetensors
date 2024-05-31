const router = require('express').Router();
const { response } = require('express');
let classObject = require('../models/classObject.model');

router.get('/:classid', async (req, res) => {
    try {
        const { classid } = req.params;
        const classObj = await classObject.findOne({ classid });

        if (!classObj) {
            return res.status(404).json('Class not found');
        }

        res.json(classObj);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

module.exports = router;