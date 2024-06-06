const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Change user rank
exports.changeRank = async (req, res) => {
    const { userId, newRank } = req.body;
    if (!userId || !newRank) {
      return res.status(400).json({ message: 'User ID and new rank are required' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.rank = newRank;
      await user.save();
  
      res.status(200).json({ message: 'User rank updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update user profile
  exports.updateUser = async (req, res) => {
    const { userId, password, profileDescription } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (password) {
        // const hashedPassword = await bcrypt.hash(password, 10);
        // user.password = hashedPassword;
        user.password = password;
      }
      if (profileDescription) {
        user.profileDescription = profileDescription;
      }
      await user.save();
  
      res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get all users
  exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete user
  exports.deleteUser = async (req, res) => {
    const  userId  = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Soft delete user
  exports.softDeleteUser = async (req, res) => {
    const  userId  = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.rank = 'Deleted';
      await user.save();
  
      res.status(200).json({ message: 'User rank updated to Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };