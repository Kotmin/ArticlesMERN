const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', auth, createCategory); // Protected route
router.put('/:id', auth, updateCategory); // Protected route
router.delete('/:id', auth, deleteCategory); // Protected route

module.exports = router;
