/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String
});

const Photo = mongoose.model('Photo', photoSchema);

const answerSchema = new Schema({
  id: Number,
  question_id: { type: Number, index: true },
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  body: String,
  date_written: Date,
  helpful: Number,
  photos: [{type: Schema.Types.ObjectId, ref: 'Photo'}]
});

const Answer = mongoose.model('Answer', answerSchema);

const questionSchema = new Schema({
  id: Number,
  product_id: { type: Number, index: true },
  question_body: String,
  date_written: Date,
  helpful: Number,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = {
  Answer,
  answerSchema,
  Photo,
  photoSchema,
  Question,
  questionSchema,
};