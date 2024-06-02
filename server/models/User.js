const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rank: {
    type: String,
    enum: ['Guest', 'Regular', 'Worker', 'Moderator', 'Admin'],
    default: 'Regular'
  },
  registrationDate: { type: Date, default: Date.now },
  passwordChangedDate: { type: Date },
  lastOnlineDate: { type: Date },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  profileDescription: { type: String }
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordChangedDate = Date.now();
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
