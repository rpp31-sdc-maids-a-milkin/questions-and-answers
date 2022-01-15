/* eslint-disable camelcase */
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://34.201.70.69:27017/qa';

const conn = mongoose.connect(uri);

mongoose.connection.on('error', (err) => console.error(err));

module.exports = {
  conn,
};
