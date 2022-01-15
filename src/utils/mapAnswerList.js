/* eslint-disable camelcase */
const mapPhotos = (photos) => {
  if (!photos) {
    return photos;
  }
  return photos.map((photo) => {
    const { id, url } = photo;
    return { id, url };
  });
};

const mapAnswers = (answers) => {
  console.log(answers)
  if (answers.length === 0) {
    return -1;
  }
  return answers.map((answer) => {
    const a = answer;
    return {
      answer_id: a.id,
      body: a.body,
      date: a.date_written,
      answerer_name: a.answerer_name,
      helpfulness: a.helpful,
      photos: mapPhotos(a.photos),
    };
  });
};

module.exports = mapAnswers;
