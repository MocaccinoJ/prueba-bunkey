const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const Student = require('../models/students');

//CREATE STUDENT
const addStudent = async (req, res, next) => {
    const student = await new Student(req.body);
    student.save();

    res.send('recived');
};

//DELETE STUDENT
const deleteStudent = async (req, res, next) => {
    Student.findByIdAndRemove(req.params.id);

    res.json({ status: 'success' });
};

module.exports = {
    addStudent,
    deleteStudent
};