
const router = require("express").Router()
const GradeController = require('../Controller/grades/GradeController')
const middlewareControler = require('../MiddleWare/middlewareControler')

const { asyncHandler } = require('../Utils/asyncHandler')

router.get('/getAll', middlewareControler.verifyTokenIsAdminOrGV, asyncHandler(GradeController.getAllGrades))
router.get('/:id', middlewareControler.verifyToken, asyncHandler(GradeController.getGradeById))
router.post('/add-grade', middlewareControler.verifyTokenIsAdminOrGV, asyncHandler(GradeController.createGrade))
// router.post('/update/:id', middlewareControler.verifyTokenIsAdminOrGV, GradeController.updateGrade)
// router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, GradeController.deleteGrade)

// router.get('/students/:studentId/courses/:courseId', middlewareControler.verifyToken, GradeController.getGradeInSubject)
// router.get('/students/:studentId', middlewareControler.verifyToken, GradeController.getGradeAllSubjects)
// router.get('/courses/:courseId/semesters/:semesterId', middlewareControler.verifyTokenIsAdminOrGV, GradeController.getGradeInSemester)


module.exports = router