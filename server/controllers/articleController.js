const Article = require('../models/Article');
const User = require('../models/User');

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('category').populate('authors');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('category').populate('authors');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
    const { title, subtitle, description, tags, category, authors, thumbnailPath } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description, and category are required' });
    }


    if (title) {
      const existingTitle = await User.findOne({ 'contact.email': email });
      if (existingTitle && existingTitle._id.toString() !== userId) {
        return res.status(400).json({ message: 'Title already in use' });
      }
      user.contact.email = email;
    }
  
    const article = new Article({
      title,
      subtitle,
      description,
      tags,
      category,
      authors,
      thumbnailPath,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      publishedAt: null,
      status: 'draft'
    });
  
    try {
      const newArticle = await article.save();
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Update an article
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
