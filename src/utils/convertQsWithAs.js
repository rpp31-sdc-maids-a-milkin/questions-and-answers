const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

const reader = fs.createReadStream(path.join(__dirname, '/../../qsWithAs.json'));
const parser = JSONStream.parse('id');
const stringify = JSONStream.stringify('[\n', ',\n', '\n]');
const writer = fs.createWriteStream(path.join(__dirname, '/../../dataSet/qsWithAs.json'));

reader.pipe(parser).pipe(stringify).pipe(writer);
