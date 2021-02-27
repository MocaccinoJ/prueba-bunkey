const {
  Schema,
  model
} = require('mongoose');

const bcrypt = require('bcryptjs');

const UsersSchema = new Schema({
  name: String,
  email: String,
  password: String
});

UsersSchema.statics.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UsersSchema.statics.comparePassword = async (password, passwordRecived) => {
  return await bcrypt.compare(password, passwordRecived);
};

module.exports = model('users', UsersSchema);