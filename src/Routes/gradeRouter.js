
const router = require("express").Router()
const GradeController = require('../Controller/grades/GradeController')
const middlewareControler = require('../MiddleWare/middlewareControler')

const { asyncHandler } = require('../Utils/asyncHandler')

router.get('/getAll', middlewareControler.verifyTokenIsAdminOrGV, asyncHandler(GradeController.getAllGrades))
router.get('/:id', middlewareControler.verifyToken, asyncHandler(GradeController.getGradeById))
router.post('/create', middlewareControler.verifyTokenIsAdminOrGV, asyncHandler(GradeController.createGrade))
router.post('/update/:gradeId', middlewareControler.verifyTokenIsAdminOrGV, asyncHandler(GradeController.updateGrade))
// router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, asyncHandler(GradeController.deleteGrade))

router.get('/students/:studentId', middlewareControler.verifyToken, asyncHandler(GradeController.getGradeAllSubjects))
router.get('/students/:studentId/semesters/:semesterId', middlewareControler.verifyToken, asyncHandler(GradeController.getGradeInSemester))


module.exports = router