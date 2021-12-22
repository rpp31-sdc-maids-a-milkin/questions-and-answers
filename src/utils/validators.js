/* eslint-disable quotes */
/* eslint-disable camelcase */
// db = connect('mongodb://localhost/qa');

db.createCollection("photos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "answer_id"],
      properties: {
        id: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        answer_id: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        photo: {
          bsonType: "string",
          pattern: "https?://.+$",
          description: "must be a string that starts with http:// or https:// and is required"
        }
      }
    }
  }
});

db.createCollection("answers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "question_id", "answerer_name", "answerer_email", "body", "date_written"],
      properties: {
        id: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        question_id: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        answerer_name: {
          bsonType: "string",
          maxLength: 60,
          description: "must be a string of max 60 chars"
        },
        answerer_email: {
          bsonType: "string",
          description: "must be an email string"
        },
        reported: {
          bsonType: "int",
          description: "must be a boolean value"
        },
        body: {
          bsonType: "string",
          maxLength: 1000,
          description: "must be a string of maximum length 1000 chars"
        },
        date_written: {
          bsonType: "long",
          description: "must be a long integer and is required"
        },
        helpful: {
          bsonType: "int",
          description: "must be an integer"
        },
        photos: {
          bsonType: "array"
        },
      }
    }
  }
});

db.createCollection("questions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "product_id", "asker_name", "asker_email", "body", "date_written"],
      properties: {
        id: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        product_id: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        asker_name: {
          bsonType: "string",
          maxLength: 60,
          description: "must be a string of max 60 chars"
        },
        asker_email: {
          bsonType: "string",
          description: "must be an email string"
        },
        reported: {
          bsonType: "int",
          description: "must be a boolean value"
        },
        body: {
          bsonType: "string",
          maxLength: 1000,
          description: "must be a string of maximum length 1000 chars"
        },
        date_written: {
          bsonType: "long",
          description: "must be a long integer and is required"
        },
        helpful: {
          bsonType: "int",
          description: "must be an integer"
        },
        answers: {
          bsonType: "array"
        },
      }
    }
  }
});
