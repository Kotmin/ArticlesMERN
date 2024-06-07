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

// router.post('/', auth, createArticle); // Protected route
// router.put('/:id', auth, updateArticle); // Protected route
// router.delete('/:id', auth, deleteArticle); // Protected route


router.route('/')
  .get(getAllArticles)
  .post(createArticle); 

router.route('/:id')
  .get(getArticleById)
  .put(updateArticle)
  .delete(deleteArticle);



module.exports = router;
