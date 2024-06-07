const router = require('express').Router();
const user = require('../models/user.model');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new user({ username, password });
        await newUser.save();
        res.json('User added');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

router.get('/usernames', async (req, res) => {
    try {
        const usernames = await user.find().select('username');
        res.json(usernames);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
}); 

module.exports = router;