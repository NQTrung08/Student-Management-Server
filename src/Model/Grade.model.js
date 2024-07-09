// models/Grade.js
const { Schema, model} = require('mongoose');

const GradeSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: 'Semester',
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  collection: 'grades'
});

const Grade = model('Grade', GradeSchema);
module.exports = Grade;
