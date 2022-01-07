const { Question } = require('../db/models.js');
const mapAnswers = require('../utils/mapAnswerList.js');

const getAnswers = function(questionId, page = 1, count = 5, callback) {
  let mappedAnswers;
  Question.findOne({id: questionId}).populate({path: 'answers', populate: { path: 'photos' }})
    .then((data) => {
      if (!data) {
        mappedAnswers = {
          question: questionId,
          page: page,
          count: count,
          results: []
        };
      } else {
        mappedAnswers = {
          question: questionId,
          page: page,
          count: count,
          results: mapAnswers(data.answers)
        };
      }
      return mappedAnswers;
    })
    .then((mappedAnswers) => callback(null, mappedAnswers))
    .catch((err) => callback(err, null));
};

module.exports = getAnswers;