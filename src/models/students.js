const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentsSchema = new Schema(
    {
        name: String

    }
);

module.exports = mongoose.model('students', StudentsSchema);