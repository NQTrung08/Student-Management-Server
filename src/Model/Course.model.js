const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Course = new Schema({
  deleted: Boolean,
  name: String,
  code: String,
  className: String,
  time: {
    lesson: Number,
    shift: {
      type: [Number],
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    dayOfWeek: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester'
  }
}, {
  timestamps: true,
  collection: 'courses'
})



module.exports = mongoose.model("Course", Course)