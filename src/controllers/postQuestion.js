const { Question } = require('../db/models.js');

const postQuestion = async (question, callback) => {
  await Question.create(question)
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

module.exports = postQuestion;