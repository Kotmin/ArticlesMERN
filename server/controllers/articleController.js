const Article = require('../models/Article');

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
  const article = new Article(req.body);
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
