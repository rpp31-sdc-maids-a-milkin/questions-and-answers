/* eslint-disable camelcase */
const { Answer, Question, Photo } = require('../db/models.js');

const postAnswer = (questionId, answerId, answer, callback) => {
  let newId;
  let photoIds = [];
  const { body, name, email, photos } = answer;

  if (photos && photos.length > 0) {
    photos.forEach((photo) => {
      let newPhoto = new Photo(photo);
      newPhoto.save()
        .then((data) => photoIds.push(data._id));
    });
  }
  const newAnswer = new Answer({
    id: answerId,
    question_id: questionId,
    body: body,
    answerer_name: name,
    answerer_email: email,
    photos: photoIds,
  });
  newAnswer.save()
    .then((response) => {
      newId = response._id;
      return newId;
    })
    .then((newId) => {
      Question.findOneAndUpdate(
        { question_id: answer.questionId},
        { $push: { answers: [ newId ] } }
      )
        .then((data) => callback(null, data))
        .catch((err) => callback(err, null));
    });
};

module.exports = postAnswer;