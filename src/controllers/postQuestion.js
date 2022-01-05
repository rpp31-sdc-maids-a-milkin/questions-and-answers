const { Question } = require('../db/models.js');

const postQuestion = (question, callback) => {
  const q = new Question(question);
  return q.save()
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

module.exports = postQuestion;