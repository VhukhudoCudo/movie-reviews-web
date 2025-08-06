// routes/reviews.js

const express = require('express');
const Review = require('../models/Review.js');
const router = express.Router();

function isAuth(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).json({ message: 'Not authenticated' });
}

// POST: Add a new review
router.post('/', isAuth, async (req, res) => {
  const { movie, review } = req.body;
  const newReview = new Review({
    user: req.session.user.username,
    movie,
    review,
  });
  await newReview.save();
  res.json({ message: 'Review added' });
});

// GET: Fetch all reviews
router.get('/', isAuth, async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// PUT: Edit a review
router.put('/:id', isAuth, async (req, res) => {
  const { movie, review } = req.body;
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    { movie, review },
    { new: true }
  );
  if (!updatedReview) {
    return res.status(404).json({ message: 'Review not found' });
  }
  res.json(updatedReview);
});

// DELETE: Delete a review
router.delete('/:id', isAuth, async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }
  res.json({ message: 'Review deleted' });
});

module.exports = router;
