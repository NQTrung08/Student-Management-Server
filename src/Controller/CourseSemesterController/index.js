const Course = require('../models/Course');
const Semester = require('../models/Semester');
const CourseSemester = require('../models/CourseSemester');

// Thêm môn học vào kỳ học
exports.addCourseToSemester = async (req, res) => {
  const { courseId, semesterId } = req.body;
  try {
    const course = await Course.findById(courseId);
    const semester = await Semester.findById(semesterId);

    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!semester) return res.status(404).json({ message: 'Semester not found' });

    const courseSemester = new CourseSemester({
      courseId: course._id,
      semesterId: semester._id
    });

    await courseSemester.save();
    res.status(201).json(courseSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa môn học khỏi kỳ học
exports.removeCourseFromSemester = async (req, res) => {
  const { courseId, semesterId } = req.body;
  try {
    const courseSemester = await CourseSemester.findOneAndDelete({ courseId, semesterId });
    if (!courseSemester) return res.status(404).json({ message: 'Relation not found' });
    res.json({ message: 'Course removed from semester' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy các môn học theo kỳ học
exports.getCoursesBySemester = async (req, res) => {
  const { semesterId } = req.params;
  try {
    const courseSemesters = await CourseSemester.find({ semesterId })
      .populate('courseId');
    res.json(courseSemesters.map(cs => cs.courseId));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy các kỳ học theo môn học
exports.getSemestersByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseSemesters = await CourseSemester.find({ courseId })
      .populate('semesterId');
    res.json(courseSemesters.map(cs => cs.semesterId));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
