const mongoose = require("mongoose")
const Schema = mongoose.Schema


const User = new Schema({
  deleted: Boolean,
  gvcn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  fullname: String,
  firstName: String, 
  lastName: String,
  msv: String,
  password: String,
  major: String,
  year: String,
  isAdmin: Boolean,
  isGV: Boolean,
  dob: String,
  phone: String,
  email: String, 
  gender: String,
  country: String,
  address: String,
  class: String,
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
      score: {
        type: Number
      }
    }
  ],
  semesters: [
    {
      semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester"
      },
      courses: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
          }
        }
      ]
    }
  ],
  parent: {
    fatherName: String,
    motherName: String,
    fatherJob: String,
    motherJob: String,
    parentPhone: String,
    nation: String,
    presentAddress: String,
    permanentAddress: String
  }
})
module.exports = mongoose.model("User", User)