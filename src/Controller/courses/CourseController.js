const Course = require('../../Model/Course.model')
const Encrypt = require('../../Utils/encryption')

import { BadRequestError, ConflictError, NotFoundError } from '../../core/error.response'
module.exports = {
  getAllCourse: async (req, res) => {
    const courses = await Course.find({})
    const _courses = courses.filter(item => !item?.deleted);
    res.status(200).json({ message: "Success", data: _courses })
  },

  getCourse: async (req, res) => {
    const id = req.params.id
    const course = await Course.findById(id)
    if (!course || course?.deleted) {
      throw new BadRequestError('Course not found')
    }
    return res.status(200).json({ message: "Success", data: course })

  },

  createCourse: async (req, res) => {
    const { name, code, credit } = req.body
      const validCourse = await Course.findOne({ name })
      if (validCourse) {
        throw new BadRequestError('Course already exists')
      }
      const newCourse = await Course.create({
        deleted: false,
        name,
        code,
        credit,

      })

      res.status(200).json({ message: 'Create course success', data: { course: newCourse } })
    
  },

  deleteCourse: async (req, res) => {
    const {id} = req.params
      const course = await Course.findById(id)
      if (!course) {
        throw new ConflictError('Delete Failed')
      }
      course.deleted = true;
      await course.save();
      res.status(200).json({ message: 'Xóa thành công' })
    
  },

  updateCourse: async (req, res) => {
    const id = req.params.id
    const { name, code, credit } = req.body

    const course = await Course.findByIdAndUpdate(id, { $set: { name, code, credit } }, { new: true })
    if (!course) {
      throw new ConflictError('Cập nhật thất bại')
    }
    res.status(200).json({ message: 'Cập nhật thành công', data: course })

  },

}