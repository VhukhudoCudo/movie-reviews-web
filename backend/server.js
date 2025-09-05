require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();

// ✅ Allow frontend to send cookies
app.use(cors({
  origin: 'https://movie-review-f0uj.onrender.com', // your frontend domain
  credentials: true,
}));

app.use(express.json());

// ✅ Session config with proper cookie settings
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,       // true = HTTPS only (Render gives you HTTPS)
    httpOnly: true,     // prevent JS access to cookie
    sameSite: 'none'    // allow frontend <-> backend on different domains
  }
}));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
