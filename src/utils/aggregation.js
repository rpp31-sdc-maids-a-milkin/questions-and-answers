db.answers.aggregate([
  {
    $lookup: {
      from: "photos",
      localField: "id",
      foreignField: "answer_id",
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

db.answersTemp.createIndex({question_id: 1, id: -1});

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
