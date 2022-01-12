/* eslint-disable camelcase */
const { Question } = require('../db/models.js');

const postQuestion = (questionId, question, callback) => {
  const { body, name, email, product_id } = question;
  const q = new Question({
    product_id: product_id,
    question_body: body,
    asker_name: name,
    asker_email: email,
  });
  q.save()
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err, null));
};

module.exports = postQuestion;