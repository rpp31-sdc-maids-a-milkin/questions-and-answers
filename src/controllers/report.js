const { Answer, Question } = require('../db/models.js');

const markHelpful = function(model, id, callback) {
  let Model = model === answer ? Answer : model === 'question' ? Question : null;
  Model.findOneAndUpdate({ id: id }, {reported: true })
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};