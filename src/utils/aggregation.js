/* eslint-disable camelcase */
/* eslint-disable quotes */
db = connect("mongodb://localhost:27017/qa");

db.answers.createIndex({ question_id: 1 });
db.answers.createIndex({ id: 1 });
db.photos.createIndex({ answer_id: 1 });
db.questions.createIndex({ id: 1 });

const aggregateData = () => {
  db.answers.aggregate([
    {
      $lookup: {
        from: "photos",
        let: { answerId: "$id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$answer_id", "$$answerId"] } } },
          { $project: { _id: 1 } },
        ],
        as: "photosIds",
      },
    },
    {
      $addFields: {
        date: { $toDate: "$date_written" },
        photos: "$photosIds._id",
      },
    },
    {
      $project: {
        date_written: 0,
        photosIds: 0,
      },
    },
    { $out: "answersTemp" },
  ]);

  // db.answersTemp.createIndex({ question_id: 1, id: -1 });

  db.questions.aggregate([
    {
      $lookup: {
        from: "answersTemp",
        let: { questionId: "$id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$questionId"] } } },
          { $project: { _id: 1 } },
        ],
        as: "answersIds",
      },
    },
    {
      $addFields: {
        question_date: { $toDate: "$date_written" },
        answers: "$answersIds._id",
      },
    },
    {
      $project: {
        date_written: 0,
        answersIds: 0,
      },
    },
    { $out: "qas" },
  ]);

  db.qas.createIndex({ product_id: 1 });
  db.answers.drop();
  db.questions.drop();
  db.answersTemp.renameCollection('answers');
  db.qas.renameCollection('questions');
};

aggregateData();
