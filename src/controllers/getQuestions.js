/* eslint-disable camelcase */
const { Question } = require('../db/models.js');
const bucket = require('../utils/bucket.js');
const mapQuestions = require('../utils/mapQuestionList.js');

const getQuestions = function(productId, page = 1, count = 5, callback) {
  Question.find({product_id: productId}).lean().populate({path: 'answers', populate: { path: 'photos' }})
    .then((doc) => {
      let pages = bucket(doc, count);
      Promise.resolve(mapQuestions(pages[page - 1]))
        .then((mapped) => callback(null, mapped));
    })
    .catch((err) => { callback(err, null); });
};

module.exports = getQuestions;