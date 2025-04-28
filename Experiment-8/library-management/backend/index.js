const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


const authRoutes = require('./routes/auth');
console.log('Auth routes loaded:', authRoutes);
app.use('/api/auth', authRoutes);


const { auth } = require('./middleware/auth');
const bookRoutes = require('./routes/books');
app.use('/api/books', auth, bookRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.get('/', (req, res) => {
  res.send('Library Management System API');
});


app.use((req, res, next) => {
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));