const jwt = require('jsonwebtoken');

const config = require('../config');

const User = require('../models/users');

export const verifyToken = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.json('No token provided').status(403);
  }

  const decode = jwt.verify(token, config.SECRET);
  const user = await User.find({
    id: decode._id
  });

  if (!user) {
    return res.json('User not found').status(404);
  }

  ;
  next();
};