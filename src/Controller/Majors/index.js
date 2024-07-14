
const MajorModel = require('../../Model/Major.model')


module.exports = {

  getAllMajor: async (req, res, next) => {
    const major = await MajorModel.find({})

    if (!major) {
      throw new NotFoundError('Major not found')
    }
    res.status(200).json({ message: "Success", data: major })
  },

  getMajor: async (req, res, next) => {
    const { id } = req.params;
    const major = await MajorModel.findById(id)
    if (!major) {
      throw new NotFoundError('Major not found')
    }
    res.status(200).json({ data: major })
  },
  createMajor: async (req, res, next) => {
    const { name, code } = req.body;
    const newMajor = await MajorModel.create({
      name, code
    })
    res.status(200).json({ message: "Create success", data: newMajor })
  },
  updateMajor: async (req, res, next) => {
    const { id } = req.params;
    const { name, code } = req.body;
    const major = await MajorModel.findByIdAndUpdate(id, { name, code }, { new: true })
    if (!major) {
      throw new NotFoundError('Major not found')
    }
    res.status(200).json({ message: "Update success", data: major })
  },
  deleteMajor: async (req, res, next) => {
    const { id } = req.params;
    const major = await MajorModel.findByIdAndDelete(id)
    if (!major) {
      throw new NotFoundError('Major not found')
    }
    res.status(200).json({ message: "Delete success" })
  }
}


