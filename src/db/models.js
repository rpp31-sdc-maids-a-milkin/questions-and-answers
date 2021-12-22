const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  photo: String
});

const answerSchema = new Schema({
  id: Number,
  question_id: { type: Number, index: true },
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  body: String,
  date_written: Date,
  helpful: Number,
  photos: Array
});

const questionSchema = new Schema({
  id: Number,
  product_id: { type: Number, index: true },
  question_body: String,
  date_written: Date,
  helpful: Number,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  answers: Array
});

const Answer = mongoose.model('answer', answerSchema);
const Photo = mongoose.model('photo', photoSchema);
const Question = mongoose.model('question', questionSchema);

module.exports = {
  Answer,
  Photo,
  Question
};