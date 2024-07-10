const SemesterController = require('../Controller/semester/SemesterController');
const express = require("express");
const middlewareControler = require('../MiddleWare/middlewareControler')
const router = express.Router()

const { asyncHandler } = require('../Utils/asyncHandler')

router.get('/getAll',middlewareControler.verifyToken, asyncHandler(SemesterController.getAll))
router.get('/:id',middlewareControler.verifyToken, asyncHandler(SemesterController.getSemester))
router.post('/create',middlewareControler.verifyTokenIsAdmin, asyncHandler(SemesterController.create))

module.exports = router
