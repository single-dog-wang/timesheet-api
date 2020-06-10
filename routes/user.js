const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

/**
 * 简单分页查询
 */
router.get('/page-query/:pageSize/:pageNum', userController.pageQuery)

/**
 * 带有条件的分页查询
 */
router.get('/page-query-condition/:pageSize/:pageNum', userController.pageQueryCondition)

/**
 * 通过id查询指定的用户
 */
router.get('/:id', userController.queryById)
/**
 * 通过id修改用户
 */
router.put('/:id', userController.updateById)

/**
 * 通过id删除用户
 */
router.delete('/:id', userController.deleteById)


module.exports = router