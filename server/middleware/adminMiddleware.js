
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.body; 
    // console.log(userId);
    console.log("----");

    if (!req.user) {
      return res.status(400).json({ message: `User not logged ---${req.user.id}` });
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