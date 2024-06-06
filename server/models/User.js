const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const contactSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rank: {
    type: String,
    enum: ['NotActive', 'Regular', 'Worker', 'Moderator', 'Admin',"Banned","Deleted"],
    default: 'Regular'
  },
  contact: contactSchema,
  // registrationDate: { type: Date, default: Date.now },
  // lastOnlineDate: { type: Date },
  passwordChangedDate: { type: Date },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  profileDescription: { type: String }
}, { timestamps: true });

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
