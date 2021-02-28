const express = require('express');
const router = express.Router();

const { coursesCTRL } = require('../controllers');
const { authJwt } = require('../middlewares');

router.post('/addCourse', authJwt, coursesCTRL.addCourse);

module.exports = router;