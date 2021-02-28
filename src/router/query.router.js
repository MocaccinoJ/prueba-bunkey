const express = require('express');
const router = express.Router();

const { queryCTRL } = require('../controllers');
const { authJwt } = require('../middlewares');

router.get('/studentsBy50Credits', authJwt, queryCTRL.studentsBy50Credits);
router.get('/corseWithMoreStudents', authJwt, queryCTRL.courseWithMoreStudents);
router.get('/studentsCoursesCredits', authJwt, queryCTRL.studentsCoursesCredits);

module.exports = router;