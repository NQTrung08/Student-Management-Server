const router = require("express").Router()
const UserController = require('../Controller/user/UserController')
const middlewareControler = require('../MiddleWare/middlewareControler')

const { asyncHandler } = require('../Utils/asyncHandler')

router.get('/getAll',middlewareControler.verifyTokenIsAdmin, asyncHandler(UserController.getAllUser))
router.get('/:id', middlewareControler.verifyToken, UserController.getUser)
router.post('/searchStudents', middlewareControler.verifyTokenIsAdminOrGV, asyncHandler(UserController.searchStudents));
router.post('/create-user', middlewareControler.verifyTokenIsAdmin, asyncHandler(UserController.createUser))
router.post('/create-admin', UserController.createAdmin)
router.delete('/delete/:id', middlewareControler.verifyTokenIsAdmin, asyncHandler(UserController.deleteUser))
router.put('/updateProfile/:id', middlewareControler.verifyToken, asyncHandler(UserController.updateProfile))
router.put('/updateByAdmin/:id', middlewareControler.verifyTokenIsAdmin, asyncHandler(UserController.updateStudentByAdmin))
router.put('/restore/:id', middlewareControler.verifyTokenIsAdmin, asyncHandler(UserController.restoreUser));


module.exports = router