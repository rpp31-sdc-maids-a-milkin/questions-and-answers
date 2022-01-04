/* eslint-disable camelcase */
const mapAnswers = (docArray) => {
  let result = {};
  if (docArray.length) {
    docArray.forEach((doc) => {
      let mappedPhotos = doc.photos.map((photo) => {
        const { id, url } = photo;
        return { id, url };
      });
      result[doc.id] = {
        id: doc.id,
        body: doc.body,
        date: doc.date,
        answerer_name: doc.answerer_name,
        helpfulness: doc.helpful,
        photos: mappedPhotos
      };
    });
  };
  return result;
};

const mapQuestion = (doc) => {
  let mappedAnswers = mapAnswers(doc.answers);
  return {
    question_id: doc.id,
    question_body: doc.body,
    question_date: doc.date,
    asker_name: doc.asker_name,
    question_helpfulness: doc.helpful,
    reported: doc.reported,
    answers: mappedAnswers
  };
};

const mapQuestions = (questions) => {
  return {
    product_id: questions[0].product_id,
    results: questions.map((question) => mapQuestion(question))
  };
};

module.exports = mapQuestions;
