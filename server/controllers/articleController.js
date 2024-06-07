const Article = require('../models/Article');
const User = require('../models/User');
const validator = require('validator');

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const query = { status: 'draft' };
    const articles = await Article.find(query).populate('category').populate({
      path: 'authors',
      select: '_id username profileDescription articles',
      populate: [
        {
          path:'articles',
          select: '_id title'
        }
      ]
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('category')
    .populate('authors',
    '_id username profileDescription articles'
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
  const { title, header, subheader, description,
          tags, category,
          articlePath, thumbnailPath,
          authors  } = req.body;
  if (!title || !header || !description 
      || !category || !articlePath  || !thumbnailPath
     ) {
    return res.status(400).json({ message: 'Title, header, description, category,thumbnailPath,articlePath are required' });
  }

  if (!validator.isAlphanumeric(header, 'en-US', { ignore: ' -_' })) {
    return res.status(400).json({ message: 'Header can only contain letters, numbers, spaces, dashes, and underscores' });
  }

  try {
    const existingHeader = await Article.findOne({ header });
    if (existingHeader) {
      return res.status(400).json({ message: 'Header already in use' });
    }

    const article = new Article({
      title,
      header,
      subheader,
      description,
      tags,
      category,
      authors,
      articlePath: `/${articlePath}`,
      thumbnailPath,
      status: 'draft'
    });

    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an article
exports.updateArticle = async (req, res) => {
  const { title, header, subheader, description,
    tags, category,
    articlePath, thumbnailPath,
    authors,
    status  } = req.body;
  if (header && !validator.isAlphanumeric(header, 'en-US', { ignore: ' -_' })) {
    return res.status(400).json({ message: 'Header can only contain letters, numbers, spaces, dashes, and underscores' });
  }

  try {
    if (header) {
      const existingHeader = await Article.findOne({ header });
      if (existingHeader && existingHeader._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Header already in use' });
      }
    }

    if (authors) {
      const authorsExist = await User.countDocuments({ _id: { $in: authors } });
      if (authorsExist !== authors.length) {
        return res.status(400).json({ message: 'One or more authors do not exist' });
      }
    }

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Category does not exist' });
      }
    }


    const updateData = req.body;

    
    const article = await Article.findByIdAndUpdate(req.params.id,req.body, { new: true }).populate('category').populate('authors');
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (header) {
      article.header = header;
      await article.save();
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
