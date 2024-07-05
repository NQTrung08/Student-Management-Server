import SemesterControler from "@/Controler/semester/SemesterControler";
import express from "express";
const router = express.Router()
const middlewareControler = require('../MiddleWare/middlewareControler')
const RegisterControler = require('@/Controler/register/RegisterControler.js')

router.get('/getAll', SemesterControler.getAll);
router.get('/get-semester/:userId/:id', SemesterControler.getSemester);
router.post('/create', SemesterControler.create)
module.exports = router
