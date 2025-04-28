const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.get('/', (req, res) => {
  res.json({ message: 'Auth route is working' });
});


router.post('/register', async (req, res) => {
  console.log('POST /api/auth/register called with:', req.body); 
  try {
    const { username, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    
    const user = new User({ username, email, password });
    await user.save();

    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(400).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ user, token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(400).json({ error: err.message });
  }
});


router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('User not found');
    }

    res.json(user);
  } catch (err) {
    console.error('Get user error:', err.message);
    res.status(401).json({ error: 'Please authenticate' });
  }
});

module.exports = router;