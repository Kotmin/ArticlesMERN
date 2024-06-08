const { rank } = require('../models/User');

const moderatorMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  console.log(req.user.rank);

  if (req.user.rank == 'Worker' || req.user.rank == 'Admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = moderatorMiddleware;
