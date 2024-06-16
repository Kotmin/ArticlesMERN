const express = require('express');
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  deleteAllArticles,
} = require('../controllers/articleController');
const auth = require('../middleware/authMiddleware');
const owner = require('../middleware/ownershipArticleMiddleware');
const optionalAuth = require('../middleware/optionalAuthMiddleware');


const router = express.Router();

// router.post('/', auth, createArticle); // Protected route
// router.put('/:id', auth, updateArticle); // Protected route
// router.delete('/:id', auth, deleteArticle); // Protected route


router.route('/')
  .get(optionalAuth,getAllArticles)
  .post(createArticle)
  .delete(deleteAllArticles);

router.route('/:id')
  .get(getArticleById)
  .put(updateArticle)
  .delete(deleteArticle);


// temp

// router.route('/')
//   .get(getAllArticles)
//   // .get(getAllArticles)
//   .post(createArticle,auth); 

// router.route('/:id')
//   .get(getArticleById)
//   .put(updateArticle)
//   .delete(deleteArticle);




module.exports = router;
