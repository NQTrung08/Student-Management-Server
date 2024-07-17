const router = require("express").Router()
const UserController = require('../Controller/user/UserController')
const middlewareControler = require('../MiddleWare/middlewareControler')

const { asyncHandler } = require('../Utils/asyncHandler')

router.get('/getAll',middlewareControler.verifyTokenIsAdmin, asyncHandler(UserController.getAllUser))
router.get('/:id', middlewareControler.verifyToken, UserController.getUser)
router.post('/searchStudents', middlewareControler.verifyTokenIsAdminOrGV, asyncHandler(UserController.searchStudent));
router.post('/create-user', middlewareControler.verifyTokenIsAdmin, asyncHandler(UserController.createUser))
router.post('/create-admin', UserController.createAdmin)
router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, UserController.deleteUser)
router.post('/update-profile/:id', middlewareControler.verifyToken, UserController.updateProfile)
module.exports = router