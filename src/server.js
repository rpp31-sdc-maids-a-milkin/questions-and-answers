const express = require('express');
const app = express();
const db = require('./db/connection.js');

app.listen(3002, () => {
  console.log('Q&A API listening at http://localhost:3000');
});