const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CoursesSchema = new Schema({
  name: String
});
module.exports = mongoose.model('courses', CoursesSchema);