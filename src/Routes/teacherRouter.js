const router = require("express").Router()
const middlewareControler = require('../MiddleWare/middlewareControler')
const TeacherControler = require("../Controller/user/TeacherControler")
router.get('/get-all',middlewareControler.verifyTokenIsAdmin, TeacherControler.getAll)
router.post('/create-teacher',middlewareControler.verifyTokenIsAdmin, TeacherControler.createTeacher)

module.exports = router