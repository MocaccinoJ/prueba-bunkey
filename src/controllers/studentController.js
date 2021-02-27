const express = require('express');
const router = express.Router();

//INTERACTION WITH DATABASE
const Student = require('../models/students');
const config = require('../config');
const jwt = require('jsonwebtoken');
import { authJwt } from '../middlewares';

router.get('/', (req, res) => {
    res.render('index');
});

//CREATE STUDENT
router.post('/addStudent', authJwt.verifyToken, async (req, res) => {
    const student = await new Student(req.body);
    student.save();

    res.send('recived');
});

//DELETE STUDENT
router.delete('/deleteStudent/:id', authJwt.verifyToken, async (req, res) => {
    Student.findByIdAndRemove(req.params.id);

    res.json({ status: 'success' });
});

module.exports = router;