const express = require('express');
const router = express.Router();

const { userCTRL } = require('../controllers');
const { authJwt } = require('../middlewares');

router.post('/auth/signup', userCTRL.signUp);
router.post('/auth/signin', userCTRL.signIn);
router.delete('/delete', authJwt, userCTRL.deleteUser);

module.exports = router;