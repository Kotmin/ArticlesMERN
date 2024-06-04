const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
var morgan = require('morgan');

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

const PORT = process.env.PORT || 5050;

const mongoUrl = 'mongodb://localhost:27017/mernapp';

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
mongoose.connect(mongoUrl, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));


// Routes
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
