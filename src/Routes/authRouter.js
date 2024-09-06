
const express = require('express')
const router = express.Router()

const AuthController = require('../Controller/auth/AuthController')
const middlewareControler = require('../MiddleWare/middlewareControler')
const { asyncHandler } = require('../Utils/asyncHandler')

/*
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API endpoints related to user operations.
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng nhập người dùng
 *     description: API này đăng nhập một người dùng đã tồn tại.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msv:
 *                 type: string
 *                 example: "a41954"
 *               password:
 *                 type: string
 *                 example: "a41954"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', asyncHandler(AuthController.login))

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: 
 *       - Auth
 *     summary: Refresh token
 *     description: API này dùng refresh token để làm mới access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your-refresh-token-here"
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/refresh', asyncHandler(AuthController.requestRefreshToken));

router.get('/validateToken', asyncHandler(AuthController.validateToken));

// router.post('/change-password', middlewareControler.verifyToken, AuthControler.changePassword)

// router.post('/reset-password', AuthControler.resetPassword)

module.exports = router