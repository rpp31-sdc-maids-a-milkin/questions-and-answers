/* eslint-disable camelcase */
const { Question } = require('../db/models');
const mapQuestions = require('../utils/mapQuestionList');

const getQuestions = function(productId, page = 1, count = 5, callback) {
  return Question.find({ product_id: productId, reported: false }).lean().limit(count * page).populate({ path: 'answers', populate: { path: 'photos' } })
    .then((doc) => {
      let result;
      if (page > 1) {
        result = doc.slice(doc.length - count);
      } else {
        result = doc;
      }
      let data = mapQuestions(result);
      if (data === -1) {
        data = {
          product_id: productId,
          results: [],
        };
      }
      callback(null, data);
    })
    .catch((err) => { callback(err, null); });
};

module.exports = getQuestions;
