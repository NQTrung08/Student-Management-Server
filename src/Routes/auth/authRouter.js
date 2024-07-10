const router = require("express").Router()
const AuthControler = require('../../Controller/auth/AuthControler')
const middlewareControler = require('../../MiddleWare/middlewareControler')
const { asyncHandler } = require('../../Utils/asyncHandler')


router.post('/login', asyncHandler(AuthControler.login))
router.post('/refresh', asyncHandler(AuthControler.requestRefreshToken))
router.post('/change-password', middlewareControler.verifyToken, AuthControler.changePassword)

router.post('/reset-password', AuthControler.resetPassword)

module.exports = router