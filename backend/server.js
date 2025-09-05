require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();

// ✅ CORS fix (allow credentials + exact frontend URL)
app.use(cors({
  origin: 'https://movie-review-f0uj.onrender.com', 
  credentials: true
}));

app.use(express.json());

// ✅ Session config
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true on Render
    sameSite: 'None' // important for cross-site cookies
  }
}));

// ✅ DB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
