const toCamelCase = require('./toCamelCase.js');
const toSnakeCase = require('./toSnakeCase.js');

const convertKeys = function(obj, conversion = 'camel') {
  if (typeof obj === 'string') {
    return obj;
  }
  const convertFn = conversion === 'camel' ? toCamelCase :
    conversion === 'snake' ? toSnakeCase :
      () => { throw 'Second argument must be \'camel\', \'snake\', or undefined'; };

  let entries = Object.entries(obj);

  entries.forEach((entry) => {
    entry[0] = convertFn(entry[0]);

    if (entry[0] === 'answers') {
      let newAnswers = [];
      let answerEntries = Object.entries(entry[1]);
      answerEntries.forEach((i) => {
        newAnswers.push(convertKeys(i));
      });
      entry[1] = newAnswers;
    }

    if (Array.isArray(entry[1])) {
      entry[1] = entry[1].map((i) => convertKeys(i));

    } else if (typeof entry[1] === 'object') {
      entry[1] = convertKeys(entry[1], arguments[1]);
    }
  });

  return Object.fromEntries(entries);
};

module.exports = convertKeys;