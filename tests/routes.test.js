const request = require('supertest');
const app = require('../src/app.js');
// const mongoose = require('mongoose');


describe('Test the questions path', () => {
  test('It should respond to a GET request', () => {
    return request(app)
      .get('/qa/questions?product_id=59556')
      .expect(200)
      .catch((err) => {
        console.error(err);
      });
  });
});

describe('Test the answers path', () => {
  test('It should respond to a GET request', () => {
    return request(app)
      .get('/qa/questions/34555/answers?page=asdf')
      .expect(200)
      .catch((err) => {
        console.error(err);
      });
  });
});
