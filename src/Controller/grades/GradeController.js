
const Grade = require('../../Model/Grade.model');
const { } = require('../../core/error.response')


module.exports = {
  getAllGrades: async (req, res) => {
    const grades = await Grade.find()
      .populate({
        path: 'student',
      })
      .populate({
        path: 'course',
      })
      .populate({
        path: 'semester',
      })

    console.log(grades);

    // if(grades.length == 0) {
    //   return res.status(403).json({message: "Not Found"})
    // }
    res.status(200).json({ "grades": grades });

  },
  getGradeById: async (req, res) => {
    const id  = req.params.id;

    console.log(req.params)
    console.log(id)
    const grade = await Grade.findById(id)
      .populate({
        path: 'student',
      })
      .populate({
        path: 'course',

      })

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    // Sinh viên chỉ được xem điểm của chính mình
    if ( (!req.user.isAdmin && !req.user.isGV)  && req.user._id.toString() !== grade.student._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json({ "grades": grades });
  },

  createGrade: async (req, res) => {
    const { studentId, courseId, semesterId, midScore, finalScore } = req.body;
    const newGrade = await Grade.create({ studentId, courseId, semesterId, midScore, finalScore });
  
    res.status(201).json(newGrade);
    
  }


}