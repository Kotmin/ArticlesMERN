const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  abbreviation: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
