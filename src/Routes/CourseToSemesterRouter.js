

const express = require('express');
const middlewareControler = require('../MiddleWare/middlewareControler');
const router = express.Router();

router.get('/add', middlewareControler.verifyTokenIsAdmin, CourseSemesterController.addCourseToSemester)

router.delete('/',middlewareControler.verifyTokenIsAdmin, CourseSemesterController.removeCourseFromSemester);

router.get('/:semesterId/courses',middlewareControler.verifyToken, CourseSemesterController.getCoursesBySemester);

router.get('/:courseId/semesters',middlewareControler.verifyTokenIsAdminOrGV, CourseSemesterController.getSemestersByCourse);

module.exports = router