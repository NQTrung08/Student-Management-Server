import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SemesterModel = new Schema({
  semester: {
    type: Number
  },
  group: {
    type: Number
  },
  year: {
    type: String
  },
});


const Semester = mongoose.model('Semester', SemesterModel);
export default Semester