const router = require('express').Router();
const user = require('../models/user.model');

router.post('/update/:username', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userToUpdate = await user.findOne({ username, password });
        if (!userToUpdate) {
            return res.status(404).json('Invalid username or password');
        }
        await user.updateOne({ username, password }, req.body);

        res.status(200).json('User updated successfully');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

module.exports = router;