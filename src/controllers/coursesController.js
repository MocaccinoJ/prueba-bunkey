const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const Course = require('../models/courses');
const config = require('../config');
const jwt = require('jsonwebtoken');


//COURSE CREATION
const addCourse = async (req, res, next) => {
    const courses = await new Course(req.body);
    courses.save();

    res.send('recived');
};

module.exports = {
    addCourse
}