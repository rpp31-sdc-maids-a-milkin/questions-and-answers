/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

beforeAll(async () => mongoose.connect(process.env.MONGO_URL));
afterAll(async () => mongoose.connection.close());

let qid;

describe('Test the questions path', () => {
  test('it should create a question', async () => {
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
      expect(res.body).toEqual('this is an answer');
    }));

  test('It should respond to a GET request', () => request(app)
    .get('/qa/questions?product_id=99999')
    .expect(200));
});

describe('Test the answers path', () => {
  test('It should respond to a GET request', () => {
    request(app)
      .get(`/qa/questions/${qid}/answers`)
      .expect(200);
  });
});
