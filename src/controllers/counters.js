const { Answer, Question, Photo } = require('../db/models.js');

class Counters {
  constructor() {
    this.answerCount = Answer.count();
    this.questionCount = Question.count();
    this.photoCount = Photo.count();
  }

  getAnswerId() {
    let count = this.answerCount;
    this.answerCount++;
    return count;
  }

  getQuestionId() {
    let count = this.questionCount;
    this.questionCount++;
    return count;
  }

  getPhotoId() {
    let count = this.answerCount;
    this.answerCount++;
    return count;
  }

  reset() {
    this.answerCount = Answer.count();
    this.questionCount = Question.count();
    this.photoCount = Photo.count();
  }
}

module.exports = Counters;