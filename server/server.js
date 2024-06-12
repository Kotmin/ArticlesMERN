const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
var morgan = require('morgan');

dotenv.config();

const app = express();


const corsOptions = {
  origin: process.env.FRONTEND_URI | 'http://localhost:3000',
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] ,
}

// app.use(cors(corsOptions));
app.use(cors({ credentials: true }))

// app.use(cors());


app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

const PORT = process.env.PORT || 5050;


// docker run -d -p 27017:27017 --name my-mongodb mongo:latest

// const mongoUrl = 'mongodb://localhost:27017/mernapp';



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
// mongoose.connect(mongoUrl, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));


// Routes
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
