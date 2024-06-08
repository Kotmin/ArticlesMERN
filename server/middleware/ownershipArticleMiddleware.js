const Article = require('../models/Article');

const ownershipMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const articleId = req.params.id;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if the user is one of the authors of the article
    const isAuthor = article.authors.some(author => author.toString() === userId);
    if (!isAuthor) {
      return res.status(403).json({ message: 'Access denied. Only authors can modify this article.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = ownershipMiddleware;
