const express = require('express');
const router = express.Router();

const { studentCTRL } = require('../controllers');
const { authJwt } = require('../middlewares');

router.post('/addStudent', authJwt, studentCTRL.addStudent);
router.delete('/deleteStudent', studentCTRL.deleteStudent);

module.exports = router;