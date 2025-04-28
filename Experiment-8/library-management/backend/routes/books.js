
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3; 
    const skip = (page - 1) * limit;

    const books = await Book.find({ userId: req.user.id })
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments({ userId: req.user.id });
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({ books, totalPages, currentPage: page });
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    const book = new Book({
      title,
      author,
      genre,
      year,
      userId: req.user.id,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, year } = req.body;

    const book = await Book.findOne({ _id: id, userId: req.user.id });
    if (!book) {
      return res.status(404).json({ error: 'Book not found or not authorized' });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.year = year;
    await book.save();

    res.json(book);
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!book) {
      return res.status(404).json({ error: 'Book not found or not authorized' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;