/* eslint-disable camelcase */
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/qa';

const conn = mongoose.connect(uri);

mongoose.connection.on('error', (err) => console.error(err));

module.exports = {
  conn,
};
