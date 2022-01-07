/* eslint-disable camelcase */
// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String
});

const Photo = model('Photo', photoSchema);

const answerSchema = new Schema({
  id: Number,
  question_id: { type: Number, index: true },
  answerer_name: String,
  answerer_email: String,
  reported: { type: Boolean, default: false },
  body: String,
  date_written: { type: Date, default: Date.now },
  helpful: { type: Number, default: 0 },
  photos: [{type: Schema.Types.ObjectId, ref: 'Photo'}]
});

const Answer = model('Answer', answerSchema);

const questionSchema = new Schema({
  id: Number,
  product_id: { type: Number, index: true },
  body: String,
  date_written: { type: Date, default: Date.now },
  helpful: { type: Number, default: 0 },
  asker_name: String,
  asker_email: String,
  reported: { type: Boolean, default: false },
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});

const Question = model('Question', questionSchema);

module.exports = {
  Answer,
  answerSchema,
  Photo,
  photoSchema,
  Question,
  questionSchema,
};