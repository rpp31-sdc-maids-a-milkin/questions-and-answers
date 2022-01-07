/* eslint-disable camelcase */
const express = require('express');
const app = express();
const cors = require('cors');
const getQuestions = require('./controllers/getQuestions.js');
const getAnswers = require('./controllers/getAnswers.js');
const postAnswer = require('./controllers/postAnswer.js');
const postQuestion = require('./controllers/postQuestion.js');
const markHelpful = require('./controllers/markHelpful.js');
const report = require('./controllers/report.js');
const Counters = require('./controllers/counters.js');

const counter = new Counters();

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
        console.log('errored in post if statement')
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
  const questionId = req.params.question_id;
  markHelpful('answer', questionId, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(204).json(data);
    }
  });
});

app.put('/qa/answers/:answer_id/report', (req, res, next) => {
  const questionId = req.params.question_id;
  report('answer', questionId, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(204).json(data);
    }
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({error: err.message});
});

module.exports = app;
