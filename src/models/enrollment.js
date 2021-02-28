const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./students');
const Course = mongoose.model('courses');

const EnrollementSchema = new Schema(
    {

        courses: { type: Schema.ObjectId, ref: "Course" },
        students:
            [
                {
                    credits: Number,
                    _id: { type: Schema.ObjectId, ref: "Students" }
                }
            ]
    }
);

module.exports = mongoose.model('enrollment', EnrollementSchema);