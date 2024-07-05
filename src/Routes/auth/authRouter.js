const router = require("express").Router()
const AuthControler = require('../../Controler/auth/AuthControler')
const middlewareControler = require('../../MiddleWare/middlewareControler')

router.post('/login', AuthControler.login)
router.post('/refresh', AuthControler.requestRefreshToken )
router.post('/change-password', middlewareControler.verifyToken, AuthControler.changePassword)

router.post('/reset-password', AuthControler.resetPassword)

module.exports = router