const auth = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

/**
 * 登录
 */
const login = async (req, res) => {
    try {
        let params = req.body

        // 通过用户名来查询
        let loginInfo = await auth.findOne({ name: params.name })
        if (!loginInfo) return res.apiResult(-1, '用户名不存在', null)

        // 检验密码是否正确
        let pwInfo = bcrypt.compareSync(params.password, loginInfo.password)
        if (!pwInfo) return res.apiResult(-1, '密码不正确', null)

        // 登录成功 ---生成token
        let token = jwt.sign({
            id: loginInfo._id,
            name: loginInfo.name
        }, config.jwt.secretKey, { expiresIn: config.jwt.expiresIn })

        // 返回值
        res.apiResult(0, '登录成功', token)
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}


/**
 * 注册
 */
const register = async (req, res) => {
    try {
        let params = req.body
        // 密码加密
        // 获取密码
        let password = params.password
        // 随机生成盐
        let salt = bcrypt.genSaltSync(12)
        // 加盐加密
        params.password = bcrypt.hashSync(password, salt)

        // 添加用户
        let is = await auth.create(params)
        if (!is) return res.apiResult(-1, '添加失败', null)
        res.apiResult(0, '注册成功', null)
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}


/**
 * 测试
 */
const ceshi = (req, res) => {
    try {
        res.apiResult(0, 'ceshi', null)
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}


module.exports = {
    login,
    register,
    ceshi
}