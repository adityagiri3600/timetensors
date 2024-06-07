const router = require('express').Router();
const user = require('../models/user.model');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userToLogin = await user.findOne({ username, password });
        if (!userToLogin) {
            return res.status(404).json('Invalid username or password');
        }
        res.json(userToLogin);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

module.exports = router;