const courses = require('./courses.router');
const enrollment = require('./enrollment.router');
const students = require('./student.router');
const users = require('./user.router');
const querys = require('./query.router');

module.exports = {
    courses,
    enrollment,
    students,
    users,
    querys
};