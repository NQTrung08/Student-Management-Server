import mongoose from "mongoose"
const Schema = mongoose.Schema


const TeacherModel = new Schema({
  mgv: String,
  fullname: String,
  password: String,
  isGV: Boolean,
  isAdmin: Boolean,
  class: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
      students: [
        {
          student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
        }
      ]
    }
  ]
})

const Teacher = mongoose.model("Teacher", TeacherModel)
export default Teacher