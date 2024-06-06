const express = require('express');
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
// router.post('/', auth, createArticle); // Protected route
// router.put('/:id', auth, updateArticle); // Protected route
// router.delete('/:id', auth, deleteArticle); // Protected route

router.post('/', createArticle); // Protected route
router.put('/:id', updateArticle); // Protected route
router.delete('/:id', deleteArticle); // Protected route

module.exports = router;
