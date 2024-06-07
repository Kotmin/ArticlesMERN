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

articleSchema.pre('save', async function (next) {
  try {
    const populatedArticle = await this.constructor.findOne({ _id: this._id }).populate({
      path: 'authors',
      select: '_id username profileDescription articles'
    });

    if (populatedArticle) {
      console.log("Yey we have populated Article");
      this.authors = populatedArticle.authors.map(author => ({
        _id: author._id,
        username: author.username,
        profileDescription: author.profileDescription,
        articles: author.articles
      }));
    }

    next();
  } catch (err) {
    next(err);
  }
});


articleSchema.post('save', async function (doc) {
  // After saving an article, update the users' articles field
  await mongoose.model('User').updateMany(
    { _id: { $in: doc.authors } },
    { $addToSet: { articles: doc._id } }
  );
});

articleSchema.post('findOneAndUpdate', async function (doc) {
  // After updating an article, update the users' articles field
  if (doc) {
    await mongoose.model('User').updateMany(
      { _id: { $in: doc.authors } },
      { $addToSet: { articles: doc._id } }
    );
  }
});

articleSchema.post('findOneAndDelete', async function (doc) {
  // After deleting an article, remove it from users' articles field
  if (doc) {
    await mongoose.model('User').updateMany(
      { _id: { $in: doc.authors } },
      { $pull: { articles: doc._id } }
    );
  }
});

module.exports = mongoose.model('Article', articleSchema);
