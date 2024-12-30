const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Captain = require('../models/captainModel');
const blacklisttokenModel = require('../models/blackListModel');
const auth = require('../middleware/authMiddleWare');


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await Captain.findOne({ email });

        if (captain) {
            return res.status(400).json({ message: 'captain already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        const newCaptain = new Captain({ name, email, password: hash });

        await newCaptain.save();

        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        delete newCaptain._doc.password;

        res.send({ token, newCaptain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await Captain
            .findOne({ email })
            .select('+password');

        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, captain.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete captain._doc.password;

        res.cookie('token', token);

        res.send({ token, captain });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logout Route
router.get('/logout', async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: 'captain logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile', auth , async (req, res) => {
    try {
        captain = req.captain;
        // delete captain.password;
        res.send(captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router