/* eslint-disable camelcase */
const mongoose = require('mongoose');
const fs = require('fs');
const { conn } = require('../db/connection');
const { Answer, Photo, Question } = require('../db/models');
const { parse } = require('csv-parse');

const importFile = (inFile, model) => new Promise((resolve, reject) => {
  let output = [];
  const reader = fs.createReadStream(__dirname + `/../../dataSet/${inFile}`);
  const parser = parse({ columns: true });
  parser.on('data', (row) => {
    output.push(row);
    if (output.length === 1000) {
      model.insertMany(output);
      output = [];
    }
  });

  parser.on('error', (err) => { reject(err); });

  reader.on('end', () => {
    model.insertMany(output)
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });

  reader.on('error', (err) => { reject(err); });

  reader.pipe(parser);
});

importFile('answers_photos.csv', Photo)
  .then(() => importFile('answers.csv', Answer))
  .then(importFile('questions.csv', Question))
  .then(() => { mongoose.disconnect(); })
  .catch((err) => console.error(err));
