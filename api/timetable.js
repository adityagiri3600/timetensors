const router = require('express').Router();
const { response } = require('express');
let timetable = require('../models/timetable.model');
let classObject = require('../models/classObject.model');


router.get('/today/:ttid', async (req, res) => {
    const getClassDetails = (classObjects, classItem) => {
        for (let i = 0; i < classObjects.length; i++) {
            if (classObjects[i].classid === classItem.classid) {
                return {
                    ...classObjects[i],
                    ...classItem
                };
            }
        }
        if (classObjects.length > 0)
            return classObjects[0];
        return {
            Name: "Class not found",
            color: "#2b7df8",
            Properties: [],
            ...classItem
        };
    }
    const getClassesAtDate = (data, date_param) => {
        const classes = data.classes;
        date_param.setHours(0, 0, 0, 0);
        let extraClasses = [];
        if (data.extraClasses) {
            for (let i = 0; i < data.extraClasses.length; i++) {
                let ecDate = new Date(data.extraClasses[i].date);
                ecDate.setHours(0, 0, 0, 0);
                if (ecDate.valueOf() == date_param.valueOf()) {
                    extraClasses.push({ ...data.extraClasses[i], isExtraClass: true });
                }
            }
        }
        if (data.classesAtSpecificDate) {
            for (let i = 0; i < data.classesAtSpecificDate.length; i++) {
                let casdDate = new Date(data.classesAtSpecificDate[i].date);
                casdDate.setHours(0, 0, 0, 0);
                if (casdDate.valueOf() == date_param.valueOf()) {
                    return [
                        ...data.classesAtSpecificDate[i].classes,
                        ...extraClasses
                    ].sort((a, b) => {
                        if (a.Start < b.Start) {
                            return -1;
                        }
                        if (a.Start > b.Start) {
                            return 1;
                        }
                        return 0;
                    })
                        .map(classElement => {
                            return getClassDetails(data.classObjects, classElement);
                        });
                }
            }
        }
        return [
            ...classes.filter(classElement => classElement.Day == date_param.getDay()),
            ...extraClasses
        ].sort((a, b) => {
            if (a.Start < b.Start) {
                return -1;
            }
            if (a.Start > b.Start) {
                return 1;
            }
            return 0;
        })
            .map(classElement => {
                return getClassDetails(data.classObjects, classElement);
            });
    }
    try {
        const { ttid } = req.params;
        const tt = await timetable.findOne({ ttid });

        if (!tt) {
            return res.status(404).json('Timetable not found');
        }

        const timetableData = { ...tt._doc };
        const classesPromises = timetableData.classes.map(async (classItem) => {
            const classData = await classObject.findOne({ classid: classItem.classid });
            return {
                ...classItem._doc,
                ...classData._doc
            };
        });
        timetableData.classes = await Promise.all(classesPromises);
        const result = getClassesAtDate(timetableData, new Date());
        res.json({
            justNames : result.map((item) => item.Name).join(" "),
            nameWithTime : result.map((item) => item.Name + " " + item.Start + " - " + item.End),
            detailed : result[0].__parentArray
        });
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});


router.get('/:ttid', async (req, res) => {
    try {
        const { ttid } = req.params;
        const tt = await timetable.findOne({ ttid });

        if (!tt) {
            return res.status(404).json('Timetable not found');
        }

        const timetableData = { ...tt._doc };
        delete timetableData.editCode;

        const classesPromises = timetableData.classes.map(async (classItem) => {
            const classData = await classObject.findOne({ classid: classItem.classid });
            return {
                ...classItem._doc,
                ...classData._doc
            };
        });
        const classObjectsPromises = timetableData.classObjects.map(async (classItem) => {
            const classData = await classObject.findOne({ classid: classItem.classid });
            return {
                ...classItem._doc,
                ...classData._doc
            };
        });

        timetableData.classes = await Promise.all(classesPromises);
        timetableData.classObjects = await Promise.all(classObjectsPromises);

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

        await classObject.insertMany(req.body.classObjects.map(co => ({ ...co, editCode: req.body.editCode })));

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

        if (req.body.classObjects) {
            for (let i = 0; i < req.body.classObjects.length; i++) {
                const classItem = { ...req.body.classObjects[i], editCode: req.body.editCode };
                const existingClass = await classObject.findOne({ classid: classItem.classid });
                if (!existingClass) await classObject.create(classItem);
            }
        }

        delete req.body.editCode;
        await timetable.findOneAndUpdate({ ttid }, req.body);
        res.json('Timetable updated successfully');
        console.log(req.body);
        console.log(`Timetable updated: ${ttid}`);
    } catch (err) {
        console.log(err.message)
        res.status(400).json('Error: ' + err.message);
    }
});


router.post('/verify/:ttid', async (req, res) => {
    const { ttid } = req.params;
    const editCode = req.body.editCode;
    try {
        const tt = await timetable.findOne({ ttid });
        if (!tt) {
            return res.status(404).json('Timetable not found');
        }
        if (tt.editCode !== editCode) {
            return res.status(401).json('Invalid edit code');
        }
        res.json('Edit code verified');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

module.exports = router;