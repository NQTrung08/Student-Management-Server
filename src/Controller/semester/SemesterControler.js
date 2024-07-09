import Semester from "@/Model/Semester.model"
import User from "@/Model/User.model";
const SemesterControler = {
  getAll: async (req, res) => {
    try {
      const semesters = await Semester.find({})
        .populate({
          path: 'courses.course'
        });
      res.status(200).json({ data: semesters })
    }
    catch (e) {
      res.status(500).json('server error')
    }
  },
  getSemester: async (req, res) => {
    const {userId, id} = req.params;
    try {
      const semester = await Semester.find({_id: id, userId: userId})
        .populate({
          path: 'courses.course'
        })
      if (!semester) {
        res.status(404).json({ message: "Not found semester" })
        return;
      }
      res.status(200).json({ data: semester })
    }
    catch (e) {
      res.status(500).json('server error')
    }
  },
  create: async (req, res, next) => {
    const {semester, group, year} = req.body;
    try {
      const newSemes = new Semester({
        semester, group, year
      })
      await newSemes.save()
      res.status(200).json({message: "Create success",data: newSemes})
    } catch (e) {
      console.log(e)
      res.status(500).json('server error')
    }
  }

}

export default SemesterControler