const request = require('supertest');
const app = require('../src/app.js');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const getQuestions = require('../src/controllers/getQuestions.js')
const getAnswers = require('../src/controllers/getAnswers.js');
const postAnswer = require('../src/controllers/postAnswer.js');
const initializeMongoServer = require('./mongoConfigTesting.js');

initializeMongoServer();

describe('Test db functions', () => {

  afterAll(async () => await mongoose.connection.close())

  test('It should create a Question document', async () => {
    const getQuestions = require('../src/controllers/getQuestions.js');
    const postQuestion = require('../src/controllers/postQuestion.js');
    const question = {
      body: 'test',
      name: 'testName',
      email: 'email@email.com',
      product_id: '999999999'
    };
    let id;
    await postQuestion(question, (err, q) => {
      if (err) {
        console.error(err.message)
      } else {
        id = q._id;
      };
    });
    await expect(id).toBeInstanceOf(ObjectId);
    let qs;
    // await getQuestions('999999999', 1, 5, (err, questions) => {
    //   try {
    //     if (err) {
    //       console.error(err.message);
    //     } else {
    //       qs = questions;
    //     }
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // })
    // expect(qs[0].name).toEqual('testName')
  });
});

describe('Test the questions path', () => {
  test('It should respond to a GET request', () => {
    return request(app)
      .get('/qa/questions?product_id=32')
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
