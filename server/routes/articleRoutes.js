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
const admin = require('../middleware/adminMiddleware');
const ownershipOrRoleMiddleware = require('../middleware/ownerOrRoleMiddleware');


const router = express.Router();



router.route('/')
  .get(optionalAuth,getAllArticles)
  .post(auth,createArticle)
  .delete(auth,admin,deleteAllArticles);

router.route('/:id')
  .get(optionalAuth,getArticleById)
  .put(auth,ownershipOrRoleMiddleware,updateArticle)
  .delete(auth,ownershipOrRoleMiddleware,deleteArticle);




module.exports = router;
