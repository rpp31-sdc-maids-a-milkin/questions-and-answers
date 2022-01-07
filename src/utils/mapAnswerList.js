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
  if (!answers || answers.length === 0) {
    return answers;
  }
  return answers.map((answer) => {
    // console.log(answer);
    let a = answer; //answer.toObject();
    return {
      answer_id: a.id,
      body: a.body,
      answerer_name: a.answerer_name,
      helpfulness: a.helpful,
      photos: mapPhotos(a.photos)
    };
  });
};

module.exports = mapAnswers;