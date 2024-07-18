
const express = require('express');
const router = express.Router();

const middleWareController = require('../MiddleWare/middlewareControler')
const { asyncHandler } = require('../Utils/asyncHandler');
const TranscriptController = require('../Controller/Transcripts/index')


router.get('/getAll', middleWareController.verifyTokenIsAdminOrGV, asyncHandler(TranscriptController.getAll))
router.get('/:id', middleWareController.verifyToken, asyncHandler(TranscriptController.getById))
router.post('/create', middleWareController.verifyTokenIsAdminOrGV, asyncHandler(TranscriptController.createTranscript))
router.put('/update/:id', middleWareController.verifyTokenIsAdminOrGV, asyncHandler(TranscriptController.updateTranscript))
router.delete('/delete/:id', middleWareController.verifyTokenIsAdminOrGV, asyncHandler(TranscriptController.deleteTranscript))

router.get('/student/:studentId', middleWareController.verifyTokenIsAdminOrGV, asyncHandler(TranscriptController.getTranscriptByStudent))
router.get('/student/:studentId/semester/:semesterId', middleWareController.verifyTokenIsAdminOrGV, asyncHandler(TranscriptController.getTranscriptBySemester))


module.exports = router
