const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const Course = require('../models/courses');
const config = require('../config');
const jwt = require('jsonwebtoken');
import { authJwt } from '../middlewares';

router.get('/', (req, res) => {
    res.render('index');
});

//COURSE CREATION
router.post('/addCourse', authJwt.verifyToken, async (req, res) => {

    const courses = await new Course(req.body);
    courses.save();

    res.send('recieved');
});

module.exports = router;