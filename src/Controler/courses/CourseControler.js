const Course = require('../../Model/Course.model')
const Encrypt = require('../../Utils/encryption')
import Teacher from '../../Model/Teacher.model'
module.exports = {
  getAllCourse: async (req, res) => {
    try {
      const courses = await Course.find({})
      const _courses = courses.filter(item => !item?.deleted);
      res.status(200).json({ message: "Success", data: _courses })
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  },

  getCourse: async (req, res) => {
    const id = req.params.id
    try {
      const course = await Course.findById(id)
      if (!course) return res.status(404).json({ message: "Course not found" })
      if(course?.deleted) {
        return res.status(400).json({message: 'course not found'})
      }
      return res.status(200).json({ message: "Success", data: course })
    }
    catch (e) {
      console.log(e)
      res.status(500).json('Server error')
    }
  },

  createCourse: async (req, res) => {
    const { name, code, className, jd, shift, room, tc, teacher } = req.body
    try {
      const validCourse = await Course.findOne({ name, code, className, jd, shift, room, tc, teacher })
      if (validCourse) {
        res.status(400).json({ message: 'Course already exists' })
        return;
      }
      const newCourse = new Course({
        deleted: false,
        name, code, className,
        time: {
          jd, shift
        }
        ,
        room, tc, teacher
      })
      

      const existTeacher = await Teacher.findOne({ mgv: teacher.toUpperCase() })
      if (!existTeacher) {
        return res.status(404).json({ message: 'Not found teacher' })
      }
      existTeacher.class.push({course: newCourse._id});
      await newCourse.save()
      await existTeacher.save();
      res.status(200).json({ message: 'Create course success', data: { course: newCourse } })
    } catch (err) {
      console.log(err)
      res.status(522).json({ message: "server err" })
    }
  },

  deleteCourse: async (req, res) => {
    const id = req.params.id
    try {
      const course = await Course.findById(id)
      if (!course) {
        res.status(404).json({ message: 'Xóa thất bại' })
        return;
      }
      course.deleted = true;
      await course.save();
      res.status(200).json({ message: 'Xóa thành công' })
    } catch (err) {
      res.status(500).json('Server error')
    }
  }
}