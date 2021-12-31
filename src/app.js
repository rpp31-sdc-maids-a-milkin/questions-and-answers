/* eslint-disable camelcase */
const express = require('express');
const app = express();
// const conn = require('./db/connection.js');
const getQuestions = require('./controllers/getQuestions.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/qa/questions')
  .get((req, res) => {
    const { product_id, page, count } = req.query;
    res.json({ product_id, page, count });
  })
  .post((req, res) => {
    const { body, name, email, product_id } = req.body;
    res.status(201).json({ body, name, email, product_id });
  });

app.route('/qa/questions/:question_id/answers')
  .get((req, res) => {
    const questionId = req.params.question_id;
    const { page, count } = req.query;
    res.json({ questionId, page, count });
  })
  .post((req, res) => {
    const questionId = req.params.question_id;
    const { body, name, email, photos } = req.body;
    res.status(201).json({ questionId, body, name, email, photos });
  });

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const questionId = req.params.question_id;
  res.status(204).send();
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  const questionId = req.params.question_id;
  res.status(204).send();
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const questionId = req.params.question_id;
  res.status(204).send();
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  const questionId = req.params.question_id;
  res.status(204).send();
});

module.exports = app;
