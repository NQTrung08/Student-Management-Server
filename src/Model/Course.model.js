const { Schema, model } = require("mongoose")


const CourseSchema = new Schema({
  deleted: Boolean,
  name: String,
  code: String,
  credit: {
    type: Number,
  },

}, {
  timestamps: true,
  collection: 'courses'
})


const Course = model("Course", CourseSchema)

module.exports = Course