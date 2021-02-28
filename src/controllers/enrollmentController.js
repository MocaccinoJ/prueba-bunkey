const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const Enrollment = require('../models/enrollment');
const Student = require('../models/students');



//ENROLLMENT CREATION
const enrollmentCreation = async (req, res, next) => {
    const enrollment = await Enrollment.find({ courses: req.body.courses });
    const student = await Student.find({ name: req.body.name });
    const newEnroll = {
        credits: 0,
        _id: student[0]._id
    };

    console.log(enrollment);
    enrollment[0].students.push(newEnroll);
    await Enrollment.updateOne(
        { courses: req.body.courses },
        { students: enrollment[0].students });
    res.json(enrollment);
};

// //GET ENROLLMENT
const getEnrollment = async (req, res, next) => {
    const enrollment = await Enrollment.find();
    res.json(enrollment);
};

//ACT STUDENTS CREDITS
const actCredits = async (req, res, next) => {
    const enrollment = await Enrollment.find({ courses: req.body.courses });
    const students = await Student.find({ name: req.body.name });
    const id = students[0].students.filter(stu => stu._id == id.toString())[0];

    student.credits += 5;
    await Enrollment.updateOne(
        { courses: req.body.courses },
        { students: enrollment[0].students });
    res.json('recived');

};

// //DELETE ENROLLMENT
const deleteEnrollment = async (req, res, next) => {
    await Enrollment.findByAndRemove(req.params.id);

    res.json({ status: 'success' });
};

module.exports = {
    enrollmentCreation,
    getEnrollment,
    actCredits,
    deleteEnrollment
}