const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: String,
  email: String,
  phone: String,
  activo: Boolean,
  img: String
});

module.exports = mongoose.model('users', UserSchema);