const { roles: rank } = require('../models/User');

const rankMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    if (rank.indexOf(req.user.role) >= rank.indexOf("Banned")) {
      return res.status(403).json({ message: 'Access restricted' });
    }

    if (requiredRoles.includes(req.user.role)) {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  };
};

module.exports = roleMiddleware;
