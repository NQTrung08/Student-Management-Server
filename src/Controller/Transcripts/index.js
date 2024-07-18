
const Transcript = require('../../Model/Transcript.model')
const Course = require('../../Model/Course.model')
const User = require('../../Model/User.model')
const Semester = require('../../Model/Semester.model')
const { NotFoundError } = require('../../core/error.response')


const TranscriptController = {
  getAll: async (req, res) => {
    const transcripts = await Transcript.find()

    if (!transcripts) {
      throw new NotFoundError('No transcript found')
    }

    res.status(200).json({ data: transcripts })
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const transcript = await Transcript.findById(id).populate('grades')
    if (!transcript) {
      throw new NotFoundError('No transcript found')
    }
    res.status(200).json({ data: transcript })
  },

  createTranscript: async (req, res) => {
    // const { studentId, courseId, grades } = req.body;
    const { studentId, semesterId } = req.body;
    console.log(studentId);
    console.log(semesterId);


    const semester = await Semester.findById(semesterId)
    if (!semester) {
      throw new NotFoundError('Semester not found')
    }
    const student = await User.findById(studentId)    
    console.log(student)
    if (!student) {
      throw new NotFoundError('Student not found')
    }



    const newTranscript = await Transcript.create({
      student: studentId, semester: semesterId
    })
    res.status(201).json({ message: "Create success", data: newTranscript })
  },

  updateTranscript: async (req, res) => {
    const { id } = req.params;
    // const { studentId, semesterId, grades } = req.body;
    const { studentId, semesterId } = req.body;

    const semester = await Semester.findById(semesterId)
    if (!semester) {
      throw new BadRequestError('Semester not found')
    }
    const student = await User.findById(studentId)
    if (!student) {
      throw new BadRequestError('Student not found')
    }


    const transcript = await Transcript.findByIdAndUpdate(
      id,
      { student: studentId, student: semesterId },
      { new: true }
    )

    if (!transcript) {
      throw new NotFoundError('No transcript found')
    }
    res.status(200).json({ message: "Update success", data: transcript })
  },


  deleteTranscript: async (req, res) => {
    const { id } = req.params;
    const transcript = await Transcript.findByIdAndDelete(id)
    if (!transcript) {
      throw new NotFoundError('No transcript found')
    }
    res.status(200).json({ message: "Delete success" })
  },

  getTranscriptByStudent: async (req, res) => {
    const { studentId } = req.params;
    const transcript = await Transcript.find({ student: studentId })
      .populate({
        path: 'grades',
        populate: {
          path: 'course',
          select: 'name'
        }
      })
      .populate({
        path: 'semester'
      })
      .exec()


    if (!transcript) {
      throw new NotFoundError('No transcript found for this student')
    }

    res.status(200).json({ data: transcript })
  },

  // lấy bảng điểm theo từng kỳ
  getTranscriptBySemester: async (req, res) => {
    const { studentId, semesterId } = req.params;

    if (!studentId ||!semesterId) {
      throw new BadRequestError('Student ID or Semester ID is missing')
    }

    const student = await User.findById(studentId)
    if (!student) {
      throw new NotFoundError('Student not found')
    }

    const semester = await Semester.findById(semesterId)
    if (!semester) {
      throw new NotFoundError('Semester not found')
    }


    const transcript = await Transcript.find({ studentId, semesterId })
     .populate({
        path: 'grades',
        populate: {
          path: 'course',
          select: 'name'
        }
      })
     .exec()

    if (!transcript) {
      throw new NotFoundError('No transcript found for this student in this semester')
    }

    res.status(200).json({ data: transcript })
  }
}


module.exports = TranscriptController