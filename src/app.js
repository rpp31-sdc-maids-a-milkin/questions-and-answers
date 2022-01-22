/* eslint-disable no-unused-vars, no-param-reassign, camelcase */
if (process.env.NEWRELIC) {
  require('newrelic');
}
const express = require('express');

const app = express();
const cors = require('cors');
const path = require('path');
const getQuestions = require('./controllers/getQuestions');
const getAnswers = require('./controllers/getAnswers');
const postAnswer = require('./controllers/postAnswer');
const postQuestion = require('./controllers/postQuestion');
const markHelpful = require('./controllers/markHelpful');
const report = require('./controllers/report');
const Counters = require('./controllers/counters');

const counter = new Counters();
counter.reset();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.body.photos) {
    req.body.photos.forEach((photo) => {
      photo.id = counter.getPhotoId();
    });
  }
  next();
});

app.route('/qa/questions')
  .get((req, res, next) => {
    const { product_id, page, count } = req.query;
    // res.json({ product_id, page, count });
    getQuestions(product_id, page, count, (err, data) => {
      if (err) {
        next(err);
      } else {
        // console.log(data);
        res.json(data);
      }
    });
  })
  .post((req, res, next) => {
    const questionId = counter.getQuestionId();
    postQuestion(questionId, req.body, (err, data) => {
      if (err) {
        counter.reset();
        next(err);
      } else {
        res.status(201).json(data);
      }
    });
  });

app.route('/qa/questions/:question_id/answers')
  .get((req, res, next) => {
    const questionId = req.params.question_id;
    const { page, count } = req.query;
    getAnswers(questionId, page, count, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    });
  })
  .post((req, res, next) => {
    const questionId = req.params.question_id;
    const answerId = counter.getAnswerId();
    postAnswer(questionId, answerId, req.body, (err, data) => {
      if (err) {
        counter.reset();
        next(err);
      } else {
        res.status(201).json(data);
      }
    });
  });

app.put('/qa/questions/:question_id/helpful', (req, res, next) => {
  const questionId = req.params.question_id;
  markHelpful('question', questionId, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(204).json(data);
    }
  });
});

app.put('/qa/questions/:question_id/report', (req, res, next) => {
  const questionId = req.params.question_id;
  report('question', questionId, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(204).json(data);
    }
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res, next) => {
  const answerId = req.params.answer_id;
  markHelpful('answer', answerId, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(204).json(data);
    }
  });
});

app.put('/qa/answers/:answer_id/report', (req, res, next) => {
  const answerId = req.params.answer_id;
  report('answer', answerId, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(204).json(data);
    }
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
