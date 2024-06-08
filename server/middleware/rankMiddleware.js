const { ranks: rank } = require('../models/User');

const rankMiddleware = (requiredranks) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    if (rank.indexOf(req.user.rank) >= rank.indexOf("Banned")) {
      return res.status(403).json({ message: 'Access restricted' });
    }

    if (requiredranks.includes(req.user.rank)) {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  };
};

module.exports = rankMiddleware;
