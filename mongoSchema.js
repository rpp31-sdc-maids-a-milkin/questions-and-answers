import mongoose from 'mongoose';
const { Schema } = mongoose;

const qaSchema = new Schema({
  productId: Number,
  questionBody: String,
  questionDate: Date,
  questionHelpfulness: String,
  askerName: String,
  reported: Boolean,
  answers: [{
    answererName: String,
    body: String,
    date: Date,
    helpfulness: Boolean,
    photos: [{ photo: string }]
  }]
});
