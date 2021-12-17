/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const convertKeys = require('../utils/convertKeys.js');

const uri = 'mongodb://localhost:27017/qa';

const photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  photo: String
});

const answerSchema = new Schema({
  id: Number,
  question_id: Number,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  body: String,
  date_written: Date,
  helpful: Number,
  photos: Array
});

const qaSchema = new Schema({
  id: Number,
  product_id: Number,
  question_body: String,
  date_written: Date,
  helpful: Number,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  answers: Array
});

mongoose.connect(uri, { useNewUrlParser: true })
  .catch((e) => { console.log('error', e); });

const Question = mongoose.model('question', qaSchema);
const Answer = mongoose.model('answer', answerSchema);
const Photo = mongoose.model('photo', photoSchema);

Question.findOne().then((r) => console.log(r));

module.exports = Question;