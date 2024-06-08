
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.body; 
    if (!userId) {
      return res.status(400).json({ message: 'User not logged' });
    }

    if (req.user.rank !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. AO' });
      }
      next();
}

 catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = adminMiddleware;