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
        ],
        as: "photos",
      }
    },
    {
      $addFields: {
        date: { $toDate: "$date_written" }
      }
    },
    {
      $project: {
        date_written: 0,
      }
    },
    { $out: "answersTemp" }
  ]);

  db.answersTemp.createIndex({ question_id: 1, id: -1 });

  db.questions.aggregate([
    {
      $lookup: {
        from: "answersTemp",
        localField: "id",
        foreignField: "question_id",
        as: "answers",
      }
    },
    {
      $addFields: {
        question_date: { $toDate: "$date_written" }
      }
    },
    {
      $project: {
        date_written: 0,
      }
    },
    { $out: "questionsAndAnswers" }
  ]);

  db.answersTemp.drop();

  db.questionsAndAnswers.createIndex({ product_id: 1 });
};

aggregateData();
