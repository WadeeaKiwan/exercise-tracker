const express = require('express');
const cors = require('cors');
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

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
