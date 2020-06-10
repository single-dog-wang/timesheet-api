const jwt = require('jsonwebtoken')
const config = require('../config/config')

/**
 * token验证
 */
module.exports = async (req, res, next) => {
    try {
        // 获取请求头中的authorization字段---token值
        const authorization = req.headers.authorization
        if (!authorization) return res.apiResult(-1, '没有token值', null)

        // 解析token值
        let token = jwt.verify(authorization, config.jwt.secretKey)
        if (!token) return res.apiResult(-1, 'token无效', null)

        // 把token的信息绑定到req上面
        req.user = {
            id: token.id,
            name: token.name
        }
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
    next()
}

