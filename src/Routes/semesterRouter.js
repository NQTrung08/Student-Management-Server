import SemesterController from "../Controller/semester/SemesterControler";
import express from "express";
const router = express.Router()
const middlewareControler = require('../MiddleWare/middlewareControler')
const RegisterControler = require('../Controller/register/RegisterControler')

router.get('/getAll', SemesterController.getAll);
router.get('/get-semester/:userId/:id', SemesterController.getSemester);
router.post('/create', SemesterController.create)
module.exports = router
