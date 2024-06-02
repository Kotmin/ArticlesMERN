const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  header: { type: String, required: true },
  subheader: { type: String },
  description: { type: String, required: true },
  tags: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  articlePath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  publishedAt: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' }
});

module.exports = mongoose.model('Article', articleSchema);
