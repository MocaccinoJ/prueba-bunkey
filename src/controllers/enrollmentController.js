const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const Enrollment = require('../models/enrollment');
const Student = require('../models/student');
const config = require('../config');
const jwt = require('jsonwebtoken');
import { authJwt } from '../middlewares';

router.get('/', (req, res) => {
    res.render('index');
});


//ENROLLMENT CREATION
router.post('/addStudentEnrollment', authJwt.verifyToken, async (req, res) => {
    const enrollment = await Enrollment.find({ courses: req.body.courses });
    const student = await Student.find({ name: req.body.name });
    const newEnroll = {
        credits: 0,
        _id: student[0]._id
    };

    enrollment[0].students.push(newEnroll);
    await Enrollment.updateOne(
        { courses: req.body.courses },
        { students: enrollment[0].students });
    res.json(enrollment);
});

//GET ENROLLMENT
router.get('/getEnrollment', authJwt.verifyToken, async (req, res) => {
    const enrollment = await Enrollment.find();
    res.json(enrollment);
});

//ACT STUDENTS CREDITS
router.put('/getCredits', authJwt.cerifyToken, async (req, res) => {
    const enrollment = await Enrollment.find({ courses: req.body.courses });
    const students = await Student.find({ name: req.body.name });
    const id = students[0].students.filter(stu => stu._id == id.toString())[0];

    student.credits += 5;
    await Enrollment.updateOne(
        { courses: req.body.courses },
        { students: enrollment[0].students });
    res.json('recived');

});

//DELETE ENROLLMENT
router.delete('deleteEnrollment/:id', authJwt.verifyToken, async (req, res) => {
    await Enrollment.findByIdAndRemove(req.params.id);

    res.json({ status: 'success' });
});

module.exports = router;