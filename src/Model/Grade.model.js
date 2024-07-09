// models/Grade.js
const { Schema, model} = require('mongoose');

const GradeSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: 'Semester',
  },
  midScore: {
    type: Number,
  },
  finalScore: {
    type: Number,
  },
  averageScore: {
    type: Number,
  },

}, {
  timestamps: true,
  collection: 'grades'
});

GradeSchema.pre('save', function(next) {
  this.averageScore = this.midScore * 0.3 + this.finalScore * 0.7;
  next();
});

const Grade = model('Grade', GradeSchema);
module.exports = Grade;
