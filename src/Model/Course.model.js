const { Schema, model } = require("mongoose")


const CourseSchema = new Schema({
  deleted: Boolean,
  name: String,
  code: String,
  // className: String,
  // time: {
  //   lesson: Number,
  //   shift: {
  //     type: [Number],
  //     enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  //   },
  //   dayOfWeek: {
  //     type: [String],
  //     enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  //   }
  // },
  credit: {
    type: Number,
  },
  // teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  // students: [
  //   {
  //     studentId: { type: Schema.Types.ObjectId, ref: 'User' },
  //     gradeId: { type: Schema.Types.ObjectId, ref: 'Grade' }
  //   }
  // ]

}, {
  timestamps: true,
  collection: 'courses'
})


const Course = model("Course", CourseSchema)

module.exports = Course