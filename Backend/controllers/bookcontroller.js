const Book = require('../models/book');
const express = require('express');
const app = express();

// Use Express's built-in JSON middleware to parse JSON bodies
app.use(express.json());

// Use Express's built-in URL-encoded middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Add a new book
exports.addBook = async (req, res) => {
  console.log('Add book request received:', req.body); // Add logging here
  try {
    const { title, author, category, stock } = req.body;
    const newBook = new Book({ title, author, category, stock });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error); // Add logging here
    res.status(500).json({ message: 'Error adding book' });
  }
};
// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, stock } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, category, stock }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};
