const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  header: { type: String, required: true, unique: true  }, // let's assume that would be also part of uri
  subheader: { type: String },
  description: { type: String, required: true },
  tags: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  articlePath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  publishedAt: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' }
}, {timestamps: true}); // should replace createdAt and updatedAt with timestamps

module.exports = mongoose.model('Article', articleSchema);
