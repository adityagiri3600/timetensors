const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, required: true },
  username: String,
  email: String,
  password: String,
  editCodes: [{
    id: String,
    code: String,
  }],
  recentlyViewed: [String],
  createdTimetables: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;