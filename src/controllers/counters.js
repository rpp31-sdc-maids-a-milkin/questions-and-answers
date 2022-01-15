const { Answer, Question, Photo } = require('../db/models');

class Counters {
  constructor() {
    this.answerCount = 0;
    this.questionCount = 0;
    this.photoCount = 0;
    this.reset = this.reset.bind(this);
  }

  getAnswerId() {
    const count = this.answerCount;
    this.answerCount += 1;
    return count;
  }

  getQuestionId() {
    const count = this.questionCount;
    this.questionCount += 1;
    return count;
  }

  getPhotoId() {
    const count = this.answerCount;
    this.answerCount += 1;
    return count;
  }

  async reset() {
    Promise.all([
      await Answer.estimatedDocumentCount(),
      await Question.estimatedDocumentCount(),
      await Photo.estimatedDocumentCount(),
    ])
      .then((counts) => {
        [this.answerCount,
          this.questionCount,
          this.photoCount] = counts;
      });
  }
}

module.exports = Counters;
