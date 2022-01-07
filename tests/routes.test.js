const request = require('supertest');
const app = require('../src/app.js');
const mongoose = require('mongoose');

beforeAll(async () => await mongoose.connect(process.env.MONGO_URL), 10000)
afterAll(async () => await mongoose.connection.close());


describe('Test the questions path', () => {
  test('it should create a question', async () => {
    // await initializeMongoServer();
    let question = {
      body: 'I have a question',
      name: 'Question Person',
      email: 'question@person.com',
      product_id: 99999
    }
    return request(app)
      .post('/qa/questions')
      .send(question)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      // .expect(200)
      .then((response) => {
        expect(response.body._id).toBeTruthy()
      })
  })

  test('It should respond to a GET request', () => {
    return request(app)
      .get('/qa/questions?product_id=99999')
      .expect(200);
  });
});

describe('Test the answers path', () => {
  test('It should respond to a GET request', () => {
    return request(app)
      .get('/qa/questions/99999/answers')
      .expect(200);
  });
});
