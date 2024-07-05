const router = require("express").Router()
const middlewareControler = require('../MiddleWare/middlewareControler')
const RegisterControler = require('@/Controler/register/RegisterControler.js')

router.post('/add', middlewareControler.verifyToken, RegisterControler.register);

module.exports = router