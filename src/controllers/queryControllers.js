const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const User = require('../models/users');
const Student = require('../models/students');
const Course = require('../models/courses');
const Enrollment = require('../models/enrollment');
const config = require('../config');
const jwt = require('jsonwebtoken');
import { authJwt } from '../middlewares';
import { find } from '../models/users';

router.get('/', (req, res) => {
    res.render('index');
});

//QUERYS

//GET STUDENTS
router.get('/studentsBy50Credits', authJwt.verifyToken, async (req, res) => {
    const findCourses = await Enrollment.find();
    const studentsCredits = findCourses.map(course => {
        const filterCoursesStudents = course.students.filter(cour => cour.credits >= 50);

        res.json(filterCoursesStudentsourses);
    });
});

//COURSE WITH MORE STUDENTS

router.get('corseWithMoreStudents', authJwt.verifyToken, async (req, res) => {
    const findCourses = await Enrollment.find();
    let largest = 0;
    let enroll = "";
    const newArray = findCourses.map(enrollment => {
        if (enrollment.students.length > largest) {
            enroll = enrollment;
        }
    });
    console.log(enroll);
});

//STUDENTS, COURSES, CREDITS
router.get('/studentsCoursesCredits/:name', authJwt.verfyToken, async (req, res) => {
    const students = await Students.find({ name: req.params.name });
    const enrollment = await Enrollment.find();
    let newArray = [];
    enrollment.map(async enroll => {
        let newArray = [];
        const filterE = enroll.students.filter(aId => aId._id == students[0]._id.toString());
        const courseName = await Course.find({ _id: enroll.courses });
        const obj = {
            name: courseName[0].name,
            credits: filterE[0].credits
        };
        newArray.push(obj);
    });

    let newObject = {
        _id: students[0]._id,
        name: students[0].name,
        courses: newArray
    };
    await res.json(newObject);
});

module.exports = router;