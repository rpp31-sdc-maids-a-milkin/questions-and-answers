const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const getQuestions = require('../src/controllers/getQuestions.js')
const getAnswers = require('../src/controllers/getAnswers.js');
const postAnswer = require('../src/controllers/postAnswer.js');
const postQuestion = require('../src/controllers/postQuestion.js');
// const initializeMongoServer = require('./mongoConfigTesting.js');

beforeAll(async () => await mongoose.connect(process.env.MONGO_URL));
afterAll(async () => await mongoose.connection.close());

describe('Test db functions', () => {
  let qs;
  let name;


  test('It should create a Question document', async () => {
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
    await getQuestions('999999999', 1, 5, (err, questions) => {
      try {
        if (err) {
          console.error(err.message);
        } else {
          qs = questions;
        }
      } catch (error) {
        console.error(error.message);
      }
    })
    await expect(qs.results[0].asker_name).toEqual('testName')
  });

  test('It should add an answer to a question', async () => {
    const answer = {
      answerer_name: 'answer person',
      answerer_email: 'answer@answer.email',
      body: 'I will answer your question',
      photos: [{ id: 1, answer_id: 9, url: 'http://link.tld/pic.jpg' }, { id: 2, answer_id: 9, url: 'https://link.tld/picagain.jpg' }],
    }
    await postAnswer(qs.results[0]._id, 9, answer, (err, answers) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(answers);
        let name = answer.results[0].answerer_name;
      }
    })
    await expect(name).toEqual('answer person');
  });
});