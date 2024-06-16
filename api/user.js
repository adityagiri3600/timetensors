const router = require('express').Router();
const User = require('../models/user.model');
const authMiddleware = require('./authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const usr = await User.findById(req.user.id);
        if (!usr) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(usr);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put("/update", authMiddleware, async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;