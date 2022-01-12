/* eslint-disable no-underscore-dangle,  space-before-function-paren, func-names, camelcase */
// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String,
});

// photoSchema.pre('find', function() {
//   this._startTime = Date.now();
// });

// photoSchema.post('find', function() {
//   if (this._startTime != null) {
//     console.log('Photo runtime in ms: ', Date.now() - this._startTime);
//   }
// });

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
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
});

// answerSchema.pre('find', function() {
//   this._startTime = Date.now();
// });

// answerSchema.post('find', function() {
//   if (this._startTime != null) {
//     console.log('Answer runtime in ms: ', Date.now() - this._startTime);
//   }
// });

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
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
});

// questionSchema.pre('find', function() {
//   this._startTime = Date.now();
// });

// questionSchema.post('find', function() {
//   if (this._startTime != null) {
//     console.log('Question runtime in ms: ', Date.now() - this._startTime);
//   }
// });

const Question = model('Question', questionSchema);

module.exports = {
  Answer,
  answerSchema,
  Photo,
  photoSchema,
  Question,
  questionSchema,
};
