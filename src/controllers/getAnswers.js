const { Question } = require('../db/models.js');
const mapAnswers = require('../utils/mapAnswerList.js');

const getAnswers = function(questionId, page = 1, count = 5, callback) {
  Question.findOne({id: questionId})
    .then((data) => {
      let mappedAnswers = {
        question: questionId,
        page: page,
        count: count,
        results: mapAnswers(data.answers)
      };
      callback(null, mappedAnswers);
    })
    .catch((err) => callback(err, null));
};

module.exports = getAnswers;