const { Question } = require('../db/models.js');
const bucket = require('../utils/bucket.js');
const { conn } = require('../db/connection.js');
const mongoose = require('mongoose');

const getQuestions = function(productId, page = 1, count = 5, callback) {
  Question.find({product_id: productId})
    .then((doc) => {
      let pages = bucket(doc, count);
      callback(null, doc[page - 1]);
    })
    .then(() => mongoose.disconnect())
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = getQuestions;