const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));

// Routes
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
