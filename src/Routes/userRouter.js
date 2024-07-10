const router = require("express").Router()
const UserControler = require('../Controller/user/UserControler')
const middlewareControler = require('../MiddleWare/middlewareControler')

const { asyncHandler } = require('../Utils/asyncHandler')

router.get('/getAll',middlewareControler.verifyTokenIsAdmin, asyncHandler(UserControler.getAllUser))
router.get('/:id', middlewareControler.verifyToken, UserControler.getUser)
router.post('/create-user', middlewareControler.verifyTokenIsAdmin, UserControler.createUser)
router.post('/create-admin', UserControler.createAdmin)
router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, UserControler.deleteUser)
router.post('/update-profile/:id', middlewareControler.verifyToken, UserControler.updateProfile)
module.exports = router