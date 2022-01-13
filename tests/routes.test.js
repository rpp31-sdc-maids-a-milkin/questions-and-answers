/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

beforeAll(async () => mongoose.connect(process.env.MONGO_URL));
afterAll(async () => mongoose.connection.close());

let qid;
let helpfulAnswerId;
let reportedQuestion;
let reportedAnswer;

describe('Test the questions path', () => {
  test('it should create a question', () => {
    const question = {
      body: 'I have a question',
      name: 'Question Person',
      email: 'question@person.com',
      product_id: 99999,
    };
    return request(app)
      .post('/qa/questions')
      .send(question)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        qid = response.body.id;
        expect(response.body._id).toBeTruthy();
      });
  });

  test('it should add an answer to a question', () => request(app)
    .post(`/qa/questions/${qid}/answers`)
    .send(
      {
        body: 'this is an answer',
        name: 'question answerer',
        email: 'answer@question.com',
        photos: [{ url: 'http://url.url' }, { url: 'http://url.url.url' }],
      },
    )
    .then((res) => {
      expect(res).toBeTruthy();
    }));

  test('Answer should have been created', () => request(app)
    .get(`/qa/questions/${qid}/answers`)
    .expect(200)
    .then((res) => {
      const answer = res.body.results[0];
      helpfulAnswerId = answer.answer_id;
      expect(answer.body).toEqual('this is an answer');
    }));

  test('it should mark a question as helpful', () => request(app)
    .put(`/qa/questions/${qid}/helpful`)
    .expect(204));

  test('it should mark an answer as helpful', () => {
    const putUrl = `/qa/answers/${helpfulAnswerId}/helpful`;
    return request(app)
      .put(putUrl)
      .expect(204);
  });

  test('It should respond to a GET request', () => request(app)
    .get('/qa/questions?product_id=99999')
    .expect(200)
    .then((res) => {
      const question = res.body.results[0];
      expect(question.question_helpfulness).toEqual(1);
      expect(question.answers[helpfulAnswerId].helpfulness).toEqual(1);
    }));
});
