'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

const connectDB = () => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    connection.once('open', () => {
      console.log('MongoDB database connection established successfully!');
    });
  } catch (error) {
    console.error(error.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
