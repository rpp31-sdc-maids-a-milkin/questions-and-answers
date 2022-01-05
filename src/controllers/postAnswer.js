const { Answer, Question } = require('../db/models.js');

const postAnswer = (answer, callback) => {
  Question.findOne({question_id: answer.questionId})
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

module.exports = postAnswer;