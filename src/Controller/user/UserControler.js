const User = require('../../Model/User.model')
import Teacher from '../../Model/Teacher.model'

const MajorModel = require('../../Model/Major.model')
const Encrypt = require('../../Utils/encryption')
module.exports = {
  getAllUser: async (req, res) => {

    const users = await User.find({ deleted: false })
      .populate({
        path: 'semesters.semester'
      })
      .populate({
        path: 'semesters.courses.course'
      })
    if (users) {
      const data = users.map(user => {
        const { password, ...rest } = user._doc
        return rest
      })
      res.status(200).json({ data: data })
    }

  },

  getUser: async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findById(id)
        .populate({
          path: 'semesters.semester'
        })
        .populate({
          path: 'semesters.courses.course'
        })
      if (!user) return res.status(404).json({ message: "User not found" })
      if (user.deleted) {
        return res.status(404).json({ message: "User not exist" })
      }
      const { password, ...rest } = user._doc
      return res.status(200).json({ data: rest })
    }
    catch (e) {
      res.status(500).json('Server error')
    }
  },

  createUser: async (req, res) => {
    const { fullname, msv, major, year, gvcn, gender, className, email, majorId } = req.body
    const hashPassword = await Encrypt.cryptPassword(msv)
    try {
      const validUser = await User.findOne({ msv: msv });
      const gv = await Teacher.findOne({ mgv: gvcn });
      if (validUser && !validUser?.deleted) {
        res.status(400).json({ message: 'Student already exists' })
        return;
      }
      if (!gv) {
        res.status(404).json({ message: "Don't found teacher" })
        return;
      }
      const newUser = await User.create({
        deleted: false,
        msv: msv,
        gvcn: gv._id,
        fullname: fullname,
        password: hashPassword,
        major: major,
        year: year,
        isAdmin: false,
        isGV: false,
        class: className,
        gender: gender,
        email: email,
        majorId: majorId,
      })

      // Thêm sinh viên vào chuyên ngành
      const major = MajorModel.findById(majorId)
      major.students.push(newUser._id);
      await major.save();

      res.status(200).json({ message: 'Create student success', data: { user: newUser } })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server error', error: err })
    }
  },

  createAdmin: async (req, res) => {
    console.log('Request body:', req.body);
    const { msv, password } = req.body;
    const hashPassword = await Encrypt.cryptPassword(password)
    try {
      const newAdmin = await User.create({
        deleted: false,
        msv: msv,
        password: hashPassword,
        isAdmin: true,
        isGV: false,
        fullname: 'admin'
        // Các trường khác có thể được thêm vào nếu cần
      });

      console.log(newAdmin);
      const { password, ...rest } = newAdmin._doc
      // Trả về msv và password trong phản hồi
      res.status(200).json({
        message: 'Tạo admin thành công',
        data: {
          user: rest

        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Lỗi máy chủ', error: err });
    }
  },


  deleteUser: async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({ message: 'Student not exists' })
      }
      user.deleted = true;
      await user.save()
      res.status(200).json({ message: 'Delete student success' })
    } catch (err) {
      res.status(500).json({ message: 'sever error' })
    }
  },

  updateProfile: async (req, res) => {
    const { id } = req.params;
    const data = req.body
    try {
      const oldStudent = await User.findById(id);
      const user = await User.findById(id).populate('majorId')
      user.parent = {
        fatherName: data.fatherName,
        motherName: data.motherName,
        fatherJob: data.fatherJob,
        motherJob: data.motherJob,
        parentPhone: data.parentPhone,
        nation: data.nation,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress
      }
      user.firstName = data.firstName
      user.lastName = data.lastName
      user.address = data.address
      user.email = data.email
      user.dob = data.dob
      user.phone = data.phone
      user.gender = data.gender
      user.class = data.class
      user.majorId = data.majorId
      await user.save();

      // Nếu cần cập nhật danh sách sinh viên trong chuyên ngành cũ và mới
      if (oldStudent.majorId.toString() !== data.majorId) {
        // Xóa sinh viên khỏi chuyên ngành cũ
        await MajorModel.findByIdAndUpdate(oldStudent.majorId, { $pull: { students: id } });

        // Thêm sinh viên vào chuyên ngành mới
        await MajorModel.findByIdAndUpdate(majorId, { $push: { students: id } });
      }

      const { password, ...rest } = user._doc
      res.status(200).json({ message: 'Update success', data: rest })
    } catch (error) {
      res.status(500).json({ message: 'Update failed', error: error })
    }
  },
  updateGv: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      req.body.map((gv) => {
        user.gv.push(gv);
      })
      await user.save();
      res.status(200).json({ message: 'Update success', data: user });
    } catch (error) {
      res.status(500).json({ message: 'error', error: error })
    }
  }
}