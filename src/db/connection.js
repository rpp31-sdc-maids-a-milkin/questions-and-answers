/* eslint-disable camelcase */
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/qa';
console.log('mongo uri -----> ', uri);

const conn = mongoose.connect(uri, { connectTimeoutMS: 20000 });

mongoose.connection.on('error', (err) => console.error(err));

module.exports = {
  conn,
};
