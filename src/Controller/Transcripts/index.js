
const Transcript = require('../../Model/Transcript.model')
const Course = require('../../Model/Course.model')
const User = require('../../Model/User.model')
const Semester = require('../../Model/Semester.model')
const { NotFoundError, BadRequestError } = require('../../core/error.response')


const TranscriptController = {
  getAll: async (req, res) => {
    const transcripts = await Transcript.find({ deleted: false })
      .populate({
        path: 'student',
        populate: {
          path: 'majorId',
          select: 'name'
        }
      })
      .populate({
        path: 'semester'
      })

    if (!transcripts) {
      throw new NotFoundError('No transcript found')
    }

    res.status(200).json({ data: transcripts })
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const transcript = await Transcript.findById(id)
      .populate('grades')
      .populate({
        path: 'semester'
      })
      .populate({
        path: 'student',
        select: 'fullname'
      })


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

    const existingTranscript = await Transcript.findOne({ student: studentId, semester: semesterId });

    if (existingTranscript) {
      if (existingTranscript.deleted) {
        return res.status(200).json({
          message: "Transcript was deleted. Do you want to restore it?",
          transcriptId: existingTranscript._id
        });
      } else {
        throw new BadRequestError('Transcript already exists');
      }
    }


    const newTranscript = await Transcript.create({
      student: studentId,
      semester: semesterId,
      deleted: false
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
    const transcript = await Transcript.findById(id)
    if (!transcript) {
      throw new NotFoundError('No transcript found')
    }

    if (transcript.deleted) {
      throw new BadRequestError('Deleted transcript')
    }


    transcript.deleted = true;
    await transcript.save()

    res.status(200).json({ message: "Delete success" })
  },

  getTranscriptByStudent: async (req, res) => {
    const { studentId } = req.params;
    const transcripts = await Transcript.find({ student: studentId })
      .populate({
        path: 'grades',
        populate: {
          path: 'course',
          select: 'name'
        },
        select: 'course midScore finalScore averageScore status'
      })
      .populate({
        path: 'semester'
      })
      .exec()

    if (!transcripts) {
      throw new NotFoundError('No transcript found for this student')
    }

    // Tổ chức dữ liệu lại cho frontend
    const allGrades = transcripts.flatMap(transcript => transcript.grades.map(grade => ({
      course: grade.course.name,
      midScore: grade.midScore,
      finalScore: grade.finalScore,
      averageScore: grade.averageScore,
      status: grade.status
    })));



    res.status(200).json({ data: allGrades })
  },

  // lấy bảng điểm theo từng kỳ
  getTranscriptBySemester: async (req, res) => {
    const { studentId, semesterId } = req.params;

    if (!studentId || !semesterId) {
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
  },

  restoreTranscript: async (req, res) => {
    const { transcriptId } = req.body;

    const transcript = await Transcript.findById(transcriptId);
    if (!transcript) {
      throw new NotFoundError('Transcript not found');
    }

    if (!transcript.deleted) {
      throw new BadRequestError('Transcript is not deleted');
    }

    transcript.deleted = false;
    await transcript.save();

    res.status(200).json({ message: "Transcript restored", data: transcript });

  }

}


module.exports = TranscriptController