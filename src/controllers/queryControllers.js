const { compareSync } = require('bcryptjs');
const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const Course = require('../models/courses');
const Enrollment = require('../models/enrollment');
const Student = require('../models/students')
//QUERYS

//GET STUDENTS
const studentsBy50Credits = async (req, res, next) => {
    const findCourses = await Enrollment.find();
    const studentsCredits = findCourses.map(course => {
        const filterCoursesStudents = course.students.filter(cour => cour.credits >= 50);

        res.json(filterCoursesStudents);
    });

};

//COURSE WITH MORE STUDENTS
const courseWithMoreStudents = async (req, res, next) => {
    const findCourses = await Enrollment.find();
    let largest = 0;
    let enroll = "";
    const newArray = findCourses.map(enrollment => {
        if (enrollment.students.length > largest) {
            enroll = enrollment;
        }
    });
    res.json(enroll);
};

//STUDENTS, COURSES, CREDITS
const studentsCoursesCredits = async (req, res, next) => {
    const students = await Student.find({ name: req.params.name });
    const enrollment = await Enrollment.find()
    let array = []
    enrollment.map(async enroll => {
        const filtro = enroll.students.filter(n => n._id == students[0]._id.toString())
        const courseName = await Course.find({ _id: enroll.courses })
        const obj = {
            name: courseName[0].name,
            credits: filtro[0].credits
        }
        array.push(obj);
    });

    let objetoParaMostrar = {
        _id: students[0]._id,
        name: students[0].name,
        courses: array
    }
    console.log(objetoParaMostrar)
    await res.json(objetoParaMostrar);
};

module.exports = {
    studentsBy50Credits,
    courseWithMoreStudents,
    studentsCoursesCredits
};