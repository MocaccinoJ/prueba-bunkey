const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const User = require('../models/users');
const config = require('../config');
const jwt = require('jsonwebtoken');
import { authJwt } from '../middlewares';


router.get('/', (req, res) => {
    res.render('index');
});

//USER CREATION
router.post('/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password: await User.encryptPassword(password) });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, { expiresIn: 3600 });

    return res.json(token);
});

//LOGIN USER
router.post('/auth/signin', async (req, res) => {
    const user = await User.find({ email: req.body.email });
    const comparePass = await User.comparePassword(req.body.password, user[0].password);

    if (!comparePass) {
        return res.json('Invalid Password').status(401);
    };

    const token = jwt.sign({ id: user._id }, config.SECRET, { expiresIn: 3600 });
    return res.json(token);
});

//DELETE USER 
router.delete('/deleteUsers/:id', authJwt.verifyToken, async (req, res) => {
    await User.findByIdAndRemove(req.params.id);

    res.json({ status: 'success' });
});

module.exports = router;