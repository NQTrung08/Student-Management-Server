const Semester = require("../../Model/Semester.model");
const { NotFoundError } = require("../../core/error.response");

const SemesterControler = {
  getAll: async (req, res) => {
    const semesters = await Semester.find()
    res.status(200).json({ data: semesters })

  },
  getSemester: async (req, res) => {
    const { id } = req.params;
    const semester = await Semester.find(id)
    if (!semester) {
      throw new NotFoundError('No semester found')
    }
    res.status(200).json({ data: semester })
  },
  create: async (req, res, next) => {
    const { semester, group, year } = req.body;
    const newSemes = await Semester.create({
      semester, group, year
    })
    res.status(200).json({ message: "Create success", data: newSemes })
  }

}

module.exports = SemesterControler