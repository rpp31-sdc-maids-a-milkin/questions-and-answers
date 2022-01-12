const { Answer, Question } = require('../db/models');

const markHelpful = function (model, id, callback) {
  let Model;
  if (model === 'answer') {
    Model = Answer;
  } else if (model === 'question') {
    Model = Question;
  } else {
    Model = null;
  }

  Model.findOneAndUpdate({ id: id }, {$inc: { helpful: 1 }})
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

module.exports = markHelpful;
