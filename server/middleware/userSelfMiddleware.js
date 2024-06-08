
const User = require('../models/User');

const ownershipMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.body; 
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    if (req.user.role === 'Admin' || req.user.role === 'Moderator') {
      return next(); // Admins and Moderators are allowed
    }

    if (req.user._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = ownershipMiddleware;
