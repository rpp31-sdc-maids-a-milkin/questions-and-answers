/* eslint-disable default-param-last */
const { Question } = require('../db/models');
const mapAnswers = require('../utils/mapAnswerList');

const getAnswers = function (questionId, page = 1, count = 5, callback) {
  let mappedAnswers;
  Question.findOne({ id: questionId }).populate({ path: 'answers', populate: { path: 'photos' } })
    .then((data) => {
      mappedAnswers = {
        question: questionId,
        page,
        count,
        results: mapAnswers(data),
      };
      if (mappedAnswers.results === -1) {
        mappedAnswers.results = [];
      }
      return mappedAnswers;
    })
    .then((answers) => callback(null, answers))
    .catch((err) => callback(err, null));
};

module.exports = getAnswers;
