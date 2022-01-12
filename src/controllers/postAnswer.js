/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { Answer, Question, Photo } = require('../db/models');

const postAnswer = async (questionId, answerId, answer, callback) => {
  try {
    const photoIds = [];
    const {
      body, name, email, photos,
    } = answer;

    if (photos && photos.length > 0) {
      photos.forEach((photo) => {
        const newPhoto = new Photo(photo);
        newPhoto.save()
          .then((data) => photoIds.push(data._id));
      });
    }

    const newAnswer = new Answer({
      id: answerId,
      question_id: questionId,
      body,
      answerer_name: name,
      answerer_email: email,
      photos: photoIds,
    });
    const response = await newAnswer.save();
    const newId = response._id;
    const data = await Question.findOneAndUpdate(
      { question_id: answer.questionId },
      { $push: { answers: [newId] } },
    );
    await callback(null, data);
  } catch (err) {
    callback(err, null);
  }
};

module.exports = postAnswer;
