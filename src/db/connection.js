/* eslint-disable camelcase */
const mongoose = require('mongoose');

<<<<<<< HEAD
const uri = process.env.MONGO_URI || 'mongodb://34.201.70.69:27017/qa';
=======
const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/qa';
>>>>>>> main

const conn = mongoose.connect(uri);

mongoose.connection.on('error', (err) => console.error(err));

module.exports = {
  conn,
};
