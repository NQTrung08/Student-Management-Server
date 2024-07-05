const router = require("express").Router()
const middlewareControler = require('../MiddleWare/middlewareControler')
const TeacherControler = require("../Controler/user/TeacherControler")
router.get('/get-all', TeacherControler.getAll)
router.post('/create-teacher',middlewareControler.verifyTokenIsAdmin, TeacherControler.createTeacher)

module.exports = router