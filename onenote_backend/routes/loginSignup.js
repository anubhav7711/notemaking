
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('../models/users');

const User = mongoose.model('User', userSchema);

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).send({ message: 'User successfully registered',user:newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).send({ error: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        res.cookie('userSession', 'placeholder_session_token', {
            httpOnly: true,
            secure: false,
        });

        res.status(200).send({ message: 'Logged in successfully', user:existingUser});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;
