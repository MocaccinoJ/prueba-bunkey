const express = require('express');
const router = express.Router();

const { enrollmentCTRL } = require('../controllers');
const { authJwt } = require('../middlewares');

router.post('/addStudentEnrollment', authJwt, enrollmentCTRL.enrollmentCreation);
router.get('/getEnrollment', authJwt, enrollmentCTRL.getEnrollment);
router.put('/actCredits', authJwt, enrollmentCTRL.actCredits);
router.delete('/deleteEnrollment', authJwt, enrollmentCTRL.deleteEnrollment);


module.exports = router;