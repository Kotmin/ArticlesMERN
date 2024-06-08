const Article = require('../models/Article');
const { roles } = require('../models/User');

const ownershipOrRoleMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const userRole = req.user.role;
  const allowedRoles = ["Worker", "Moderator", "Admin"];

  if (allowedRoles.includes(userRole)) {
    return next();
  }

  const articleId = req.params.id;

  Article.findById(articleId)
    .then(article => {
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      const isOwner = article.authors.some(author => author.toString() === req.user.id);
      if (isOwner) {
        return next();
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    })
    .catch(error => res.status(500).json({ message: error.message }));
};

module.exports = ownershipOrRoleMiddleware;
