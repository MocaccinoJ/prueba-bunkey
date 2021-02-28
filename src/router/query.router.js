const express = require('express');
const router = express.Router();

const { queryCTRL } = require('../controllers');
const { authJwt } = require('../middlewares');

router.get('/studentsBy50Credits', queryCTRL.studentsBy50Credits);
router.get('/corseWithMoreStudents', queryCTRL.courseWithMoreStudents);
router.get('/studentsCoursesCredits', queryCTRL.studentsCoursesCredits);

module.exports = router;