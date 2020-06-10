const express = require('express')

// controller层
const authController = require('../controllers/authController')

// 创建一个路由容器
const router = express.Router()


/**
 * 测试路由
 */
router.get('/ceshi', authController.ceshi)


/**
 * 注册
 */
router.post('/register', authController.register)

/**
 * 登录
 */
router.post('/login', authController.login)


module.exports = router