
const Grade = require('../../Model/Grade.model');
const { BadRequestError, NotFoundError } = require('../../core/error.response')


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
    const id = req.params.id;

    const grade = await Grade.findById(id)
      .populate({
        path: 'student',
      })
      .populate({
        path: 'course',

      })

    console.log(grade)

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    console.log(req.user)
    // Sinh viên chỉ được xem điểm của chính mình
    if ((!req.user.isAdmin && !req.user.isGV) && req.user.id.toString() !== grade.student._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json({ "grades": grade });
  },

  createGrade: async (req, res) => {
    const { studentId, courseId, semesterId, midScore, finalScore } = req.body;


    // if (!studentId || !courseId || !semesterId || midScore === undefined || finalScore === undefined) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

    // // Kiểm tra xem điểm giữa kỳ và điểm cuối kỳ có hợp lệ không
    // if (typeof midScore !== 'number' || typeof finalScore !== 'number') {
    //   return res.status(400).json({ message: 'Scores must be numbers' });
    // }

    if (midScore < 4 || midScore > 10) {
      throw new Error('Invalid midScore, value between 4 and 10');
    }

    if (finalScore < 0 || finalScore > 10) {
      throw new Error('Invalid finalScore, value between 0 and 10');
    }

    const existingGrade = await Grade.findOne({ studentId, courseId, semesterId });

    if (existingGrade) {
      throw new BadRequestError('Grade already exists for this semester')
    }

    const newGrade = await Grade.create({ studentId, courseId, semesterId, midScore, finalScore });

    res.status(201).json(newGrade);

  },

  updateGrade: async (req, res) => {

    const { gradeId } = req.params;
    const { midScore, finalScore } = req.body;

    const updateGrade = Grade.findByIdAndUpdate( gradeId, { midScore, finalScore }, { new: true })

    if (!updateGrade) {
      throw new NotFoundError("Grade not found")
    }

    res.status(201).json(updateGrade);
  },

  getAllSubjectForStudent: async (req, res) => {
    const studentId = req.params.id;

    const grades = await Grade.find({ studentId })
     .populate({
        path: 'course',
      })
     .populate({
        path:'semester',
      })

    if (!grades) {
      throw new NotFoundError('No grades found for this student')
    }

    res.status(200).json({ grades });
  },

  getGradeInSemester: async(req, res) => {
    const { studentId, semesterId } = req.params;

    const grades = await Grade.find({ studentId, semesterId })
     .populate({
        path: 'course',
      })

    if (!grades) {
      throw new NotFoundError('No grades found for this student in this semester')
    }

    res.status(200).json({ grades });
  }



}