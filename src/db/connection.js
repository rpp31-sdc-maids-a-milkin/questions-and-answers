/* eslint-disable camelcase */
const mongoose = require('mongoose');

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/qa';
console.log('mongo uri -----> ', uri);

const conn = mongoose.connect(uri);

mongoose.connection.on('error', (err) => console.error(err));

module.exports = {
  conn,
};
