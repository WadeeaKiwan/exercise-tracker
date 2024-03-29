const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
